import React from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { FlatList } from "react-native-gesture-handler";
import { Svg, Path } from "react-native-svg";

const FitnessActivity = () => {
	// Sample data for the line chart
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

	// Sample workout data
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

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Running</Text>
				<Text style={styles.headerDate}>12 Mar 2025</Text>
			</View>

			{/* Today's Activity Chart */}
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

			{/* Previous Workouts */}
			{/* {workouts.map(workout => (
        
      ))} */}
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

			{/* Bottom Navigation */}
			{/* <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('./assets/home-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('./assets/search-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('./assets/heart-icon.png')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.workoutNavText}>Workout</Text>
        </TouchableOpacity>
      </View> */}
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
