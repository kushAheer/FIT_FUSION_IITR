import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	PermissionsAndroid,
	Platform,
	Animated,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { FlatList } from "react-native-gesture-handler";
import { Pedometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessActivity = () => {
	const data = {
		labels: ["", "", "", "", "", ""],
		datasets: [
			{
				data: [10, 25, 15, 30, 10, 35],
				color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
				strokeWidth: 2,
			},
		],
	};
	const workouts = [
		{
			id: 1,
			time: "01:23:45",
			calories: 160,
			distance: 3.5,
			color: "#E6F0FF",
		},
		{
			id: 2,
			time: "01:23:45",
			calories: 160,
			distance: 3.5,
			color: "#FFDDDD",
		},
		{
			id: 3,
			time: "01:23:45",
			calories: 160,
			distance: 3.5,
			color: "#E3FFE3",
		},
		{
			id: 4,
			time: "01:23:45",
			calories: 160,
			distance: 3.5,
			color: "#E6F0FF",
		},
	];
	const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
	const [stepCount, setStepCount] = useState(0);
	const [dailySteps, setDailySteps] = useState(0);
	const [stepGoal, setStepGoal] = useState(10000);
	const [stepHistory, setStepHistory] = useState([]);
	const [lastResetDate, setLastResetDate] = useState('');
	const animatedWidth = new Animated.Value(0);

	useEffect(() => {
		const loadStepData = async () => {
			try {
				const savedDailySteps = await AsyncStorage.getItem('dailySteps');
				const savedLastResetDate = await AsyncStorage.getItem('lastResetDate');
				const savedStepHistory = await AsyncStorage.getItem('stepHistory');
				const savedStepGoal = await AsyncStorage.getItem('stepGoal');
				
				if (savedDailySteps) setDailySteps(parseInt(savedDailySteps));
				if (savedLastResetDate) setLastResetDate(savedLastResetDate);
				if (savedStepHistory) setStepHistory(JSON.parse(savedStepHistory));
				if (savedStepGoal) setStepGoal(parseInt(savedStepGoal));
			} catch (error) {
				console.error('Error loading step data:', error);
			}
		};
		
		loadStepData();
	}, []);

	// useEffect(() => {
	// 	const progressPercentage = Math.min(dailySteps / stepGoal, 1);
	// 	Animated.timing(animatedWidth, {
	// 		toValue: progressPercentage,
	// 		duration: 500,
	// 		useNativeDriver: false,
	// 	}).start();
	// }, [dailySteps, stepGoal]);
	useEffect(() => {
		const requestPermission = async () => {
		  console.log("Starting permission request");
		  if (Platform.OS === "android") {
			try {
			  console.log("Requesting Activity Recognition permission");
			  const { status: existingStatus } = await Pedometer.getPermissionsAsync();
			  console.log("Existing permission status:", existingStatus);
			  
			  if (existingStatus !== 'granted') {
				console.log("Permission not granted, requesting...");
				const { status } = await Pedometer.requestPermissionsAsync();
				console.log("Permission request result:", status);
				
				if (status !== 'granted') {
				  console.log("Permission denied");
				  alert("Permission to access pedometer was denied");
				  return false;
				}
			  }
			  
			  console.log("Permission granted");
			  return true;
			} catch (error) {
			  console.error("Error requesting permission:", error);
			  return false;
			}
		  }
		  return true;
		};
		
		requestPermission().then(granted => {
		  if (granted) {
			console.log("Setting up pedometer after permission granted");
			// Set up pedometer here
		  }
		});
	  }, []);
	useEffect(() => {
		const checkDayReset = async () => {
			const today = new Date().toDateString();
			
			if (lastResetDate !== today) {
			  if (lastResetDate && dailySteps > 0) {
				const newStepHistory = [...stepHistory, { date: lastResetDate, steps: dailySteps }];
				if (newStepHistory.length > 7) { 
				  newStepHistory.shift();
				}
				setStepHistory(newStepHistory);
				await AsyncStorage.setItem('stepHistory', JSON.stringify(newStepHistory));
			  }
			  setLastResetDate(today);
			  setDailySteps(0);
			  await AsyncStorage.setItem('lastResetDate', today);
			  await AsyncStorage.setItem('dailySteps', '0');
			  console.log("Day reset performed");
			}
		  };
		  checkDayReset();
	},[lastResetDate, dailySteps, stepHistory] );

	useEffect(() => {
	let subscription = null;
	
	const startPedometerTracking = async () => {
	  console.log("Starting pedometer setup");
	  
	  try {
		const isAvailable = await Pedometer.isAvailableAsync();
		console.log("Pedometer available:", isAvailable);
		setIsPedometerAvailable(isAvailable ? "available" : "not available");
		
		if (!isAvailable) {
		  console.log("Pedometer is not available on this device");
		  return;
		}
	  } catch (error) {
		console.error("Error checking pedometer availability:", error);
		setIsPedometerAvailable("error");
		return;
	  }
	  console.log("Setting up step count subscription");
	  try {
		subscription = Pedometer.watchStepCount(result => {
		  console.log("Step count update:", result.steps);
		  
		  setStepCount(prevCount => {
			const newCount = result.steps;
			console.log(`Previous count: ${prevCount}, New count: ${newCount}`);
			
			if (newCount > prevCount) {
			  const stepIncrease = newCount - prevCount;
			  console.log(`Step increase: ${stepIncrease}`);
			  
			  setDailySteps(prevDailySteps => {
				const updatedDailySteps = prevDailySteps + stepIncrease;
				console.log(`Updated daily steps: ${updatedDailySteps}`);
				
				AsyncStorage.setItem('dailySteps', updatedDailySteps.toString())
				  .then(() => console.log("Saved daily steps to storage"))
				  .catch(err => console.error("Error saving daily steps:", err));
				
				return updatedDailySteps;
			  });
			}
			
			return newCount;
		  });
		});
		
		console.log("Step count subscription set up successfully");
	  } catch (error) {
		console.error("Error setting up step count subscription:", error);
	  }
	};
	
	startPedometerTracking();
	
	return () => {
	  console.log("Cleaning up pedometer subscription");
	  if (subscription) {
		subscription.remove();
	  }
	};
  	}, []); 
  	const formatNumber = (num) => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	const caloriesBurned = Math.round(dailySteps * 0.04);
	const distanceTraveled = (dailySteps * 0.000762).toFixed(2);
	const progressPercentage = Math.min((dailySteps / stepGoal) * 100, 100);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Running</Text>
				<Text style={styles.headerDate}>12 Mar 2025</Text>
			</View>

			<View style={styles.chartContainer}>
				<View style={styles.chartHeader}>
					<TouchableOpacity style={styles.todayButton}>
						<Text style={styles.todayButtonText}>Today</Text>
					</TouchableOpacity>
				</View>

				<LineChart
					data={data}
					width={340}
					height={150}
					chartConfig={{
						backgroundColor: "#f0f0f0",
						backgroundGradientFrom: "#f0f0f0",
						backgroundGradientTo: "#f0f0f0",
						decimalPlaces: 0,
						color: (opacity = 1) => `rgba(231, 76, 60, ${opacity})`,
						style: {
							borderRadius: 16,
						},
						propsForDots: {
							r: "0",
						},
					}}
					bezier
					style={styles.chart}
					withDots={false}
					withInnerLines={false}
					withOuterLines={false}
					withVerticalLabels={false}
					withHorizontalLabels={false}
				/>

				<View style={styles.statsContainer}>
					<View style={styles.statsItem}>
						<Text style={styles.statsLabel}>Time</Text>
						<Text style={styles.statsValue}>01:34:23</Text>
					</View>
					<View style={styles.statsItem}>
						<Text style={styles.statsLabel}>Burning</Text>
						<Text style={styles.statsValue}>360 Cal</Text>
					</View>
				</View>
			</View>

			{/* Pedometer Section */}
			<View style={styles.pedometerContainer}>
				<Text style={styles.pedometerTitle}>Step Counter</Text>
				
				<View style={styles.stepProgressContainer}>
					<Text style={styles.stepProgressText}>
						{formatNumber(dailySteps)} / {formatNumber(stepGoal)} steps
					</Text>
					
					<View style={styles.progressBarContainer}>
						<View 
							style={[
								styles.progressBar,
								{ width: `${progressPercentage}%` }
							]} 
						/>
					</View>
				</View>
				
				<View style={styles.stepStatsContainer}>
					<View style={styles.stepStatItem}>
						<Text style={styles.stepStatLabel}>Calories</Text>
						<Text style={styles.stepStatValue}>{caloriesBurned} cal</Text>
					</View>
					
					<View style={styles.stepStatItem}>
						<Text style={styles.stepStatLabel}>Distance</Text>
						<Text style={styles.stepStatValue}>{distanceTraveled} km</Text>
					</View>
					
					<View style={styles.stepStatItem}>
						<Text style={styles.stepStatLabel}>Status</Text>
						<Text style={styles.stepStatValue}>
							{dailySteps >= stepGoal ? "Goal reached! 🎉" : "In progress"}
						</Text>
					</View>
				</View>

				{isPedometerAvailable !== "available" && (
					<Text style={styles.pedometerWarning}>
						Pedometer is {isPedometerAvailable}. Enable permissions for accurate tracking.
					</Text>
				)}
			</View>

			{/* Previous Workouts */}
			<FlatList
				data={workouts}
				renderItem={(workout) => (
					<View
						key={workout.item.id}
						style={[
							styles.workoutItem,
							{ backgroundColor: workout.item.color },
						]}
					>
						<View style={styles.workoutInfo}>
							<View style={styles.workoutType}>
								<Text style={styles.workoutText}>Running</Text>
							</View>
							<Text style={styles.workoutTime}>
								{workout.item.time}
							</Text>
						</View>
						<View style={styles.workoutStats}>
							<View style={styles.calorieContainer}>
								<Text style={styles.calorieText}>
									{workout.item.calories} Cal
								</Text>
							</View>
							<Text style={styles.distanceText}>
								{workout.item.distance} km
							</Text>
						</View>
					</View>
				)}
			/>

		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
	},
	header: {
		paddingTop: 16,
		paddingBottom: 8,
	},
	headerTitle: {
		fontSize: 16,
		fontWeight: "400",
	},
	headerDate: {
		fontSize: 20,
		fontWeight: "600",
	},
	chartContainer: {
		backgroundColor: "#f0f0f0",
		borderRadius: 16,
		marginBottom: 16,
		padding: 12,
	},
	chartHeader: {
		flexDirection: "row",
		justifyContent: "flex-start",
		marginBottom: 8,
	},
	todayButton: {
		backgroundColor: "#E74C3C",
		borderRadius: 16,
		paddingVertical: 6,
		paddingHorizontal: 16,
	},
	todayButtonText: {
		color: "white",
		fontWeight: "500",
	},
	chart: {
		marginVertical: 8,
		borderRadius: 16,
	},
	statsContainer: {
		flexDirection: "row",
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
		paddingTop: 12,
	},
	statsItem: {
		flex: 1,
		alignItems: "center",
	},
	statsLabel: {
		fontSize: 14,
		color: "#666",
	},
	statsValue: {
		fontSize: 16,
		fontWeight: "600",
		color: "#E74C3C",
	},
	pedometerContainer: {
		marginVertical: 16,
		padding: 16,
		backgroundColor: "#f9f9f9",
		borderRadius: 12,
	},
	pedometerTitle: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 10,
	},
	pedometerStatus: {
		fontSize: 14,
		color: "#666",
		marginBottom: 5,
	},
	stepCount: {
		fontSize: 16,
		fontWeight: "600",
		color: "#E74C3C",
	},
	workoutItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
	},
	workoutInfo: {
		flexDirection: "column",
	},
	workoutType: {
		flexDirection: "row",
		alignItems: "center",
	},
	workoutIcon: {
		width: 16,
		height: 16,
		marginRight: 6,
	},
	workoutText: {
		fontSize: 16,
		fontWeight: "500",
	},
	workoutTime: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
	workoutStats: {
		alignItems: "flex-end",
	},
	calorieContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	calorieIcon: {
		width: 16,
		height: 16,
		marginRight: 4,
	},
	calorieText: {
		fontSize: 16,
		fontWeight: "500",
	},
	distanceText: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
	bottomNav: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 16,
		borderTopWidth: 1,
		borderTopColor: "#e0e0e0",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "white",
		paddingHorizontal: 24,
	},
	navItem: {
		alignItems: "center",
	},
	navIcon: {
		width: 24,
		height: 24,
	},
	addButton: {
		backgroundColor: "#f0f0f0",
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	addButtonText: {
		fontSize: 24,
		fontWeight: "600",
	},
	workoutNavText: {
		color: "#E74C3C",
		fontSize: 12,
	},
});

export default FitnessActivity;
