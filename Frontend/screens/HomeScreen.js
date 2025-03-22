import React from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/color";
import ScheduleScreen from "./ScheduleScreen";

const HomeScreen = ({navigation}) => {


	const handlePress= ()=>{
		navigation.navigate('Schedule');
	}


	return (
		<ScrollView style={styles.container}>

			<View style={styles.header}>
				<View style={styles.profileSection}>
					<Image
						source={require("../assets/profile.jpg")}
						style={styles.profilePic}
					/>
					<View style={styles.profileInfo}>
						<Text style={styles.name}>Hello John</Text>
						<View style={styles.locationContainer}>
							<View style={styles.locationDot} />
							<Text style={styles.location}>
								IIT Roorkee Main Gym
							</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity>
					<View style={styles.bellIcon}>
						<Text style={styles.bellIconText}>
							<Ionicons
								name="notifications"
								size={24}
								color="black"
							/>
						</Text>
					</View>
				</TouchableOpacity>
			</View>


			<View style={styles.sessionCard}>
				<View style={styles.sessionInfo}>
					<View style={styles.clockIcon}>
						<Text>⏱️</Text>
					</View>
					<View>
						<Text style={styles.sessionLabel}>
							Session Scheduled
						</Text>
						<Text style={styles.sessionTime}>03:45 PM</Text>
					</View>
				</View>
				<TouchableOpacity 
					style={styles.editButton}
					onPress={handlePress}
				>
					<Text style={styles.editButtonText}>Edit Session</Text>

				</TouchableOpacity>
			</View>


			<View style={styles.workoutCard}>
				<Text style={styles.sectionTitle}>Workout Today</Text>

				<View style={styles.progressSection}>
					<Text style={styles.progressLabel}>Steps</Text>
					<Text style={styles.progressValue}>10240/15000 gm</Text>
				</View>
				<View style={styles.progressBar}>
					<View style={[styles.progressFill, { width: "68%" }]} />
				</View>

				<View style={styles.progressSection}>
					<Text style={styles.progressLabel}>Calories</Text>
					<Text style={styles.progressValue}>2124/3350 gm</Text>
				</View>
				<View style={styles.progressBar}>
					<View style={[styles.progressFill, { width: "63%" }]} />
				</View>

				<TouchableOpacity style={styles.viewMoreButton}>
					<Text style={styles.viewMoreText}>View More</Text>
					<Text style={styles.arrowIcon}>›</Text>
				</TouchableOpacity>
			</View>


			<View style={styles.goalsCard}>
				<Text style={styles.sectionTitle}>Your Daily Goals</Text>
				<Text style={styles.subTitle}>Last 7 days</Text>

				<View style={styles.achievementSection}>
					<Text style={styles.achievementText}>2/7 achieved</Text>

					<View style={styles.weekCircles}>
						
						<View
							style={[styles.dayCircle, styles.dayIncomplete]}
						/>
						<View style={[styles.dayCircle, styles.dayComplete]} />
						<View style={[styles.dayCircle, styles.dayPartial]} />
						<View style={[styles.dayCircle, styles.dayEmpty]} />
						<View style={[styles.dayCircle, styles.dayComplete]} />
						<View style={[styles.dayCircle, styles.dayPartial]} />
						<View style={[styles.dayCircle, styles.dayPartial]} />
					</View>
				</View>

				<View style={styles.dayPointer}>
					<Text style={styles.pointerText}>▲</Text>
					<View style={styles.nameTag}>
						<Text style={styles.nameTagText}>John</Text>
					</View>
				</View>
			</View>

			{/* Latest From Circle Section */}
			<View style={styles.latestSection}>
				<View style={styles.latestHeader}>
					<Text style={styles.sectionTitle}>
						Latest from your circle
					</Text>
					<TouchableOpacity>
						<Text style={styles.viewAllText}>View More</Text>
					</TouchableOpacity>
				</View>

				{/* Friend Update */}
				<View style={styles.friendUpdate}>
					<View style={styles.friendContainer}>
						<Image
							source={require("../assets/profile.jpg")}
							style={styles.friendPic}
						/>
						<View style={styles.friendInfo}>
							<Text style={styles.friendName}>John Doe Guy</Text>
							<View style={styles.friendLocation}>
								<View style={styles.locationDot} />
								<Text style={styles.friendLocationText}>
									IIT Roorkee Gym
								</Text>
							</View>
							<Text style={styles.friendPostText}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis eiusd
								<Text style={styles.readMore}>
									Read More...
								</Text>
							</Text>
						</View>
					</View>
					<View style={styles.friendContainer}>
						<Image
							source={require("../assets/profile.jpg")}
							style={styles.friendPic}
						/>
						<View style={styles.friendInfo}>
							<Text style={styles.friendName}>John Doe Guy</Text>
							<View style={styles.friendLocation}>
								<View style={styles.locationDot} />
								<Text style={styles.friendLocationText}>
									IIT Roorkee Gym
								</Text>
							</View>
							<Text style={styles.friendPostText}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis eiusd
								<Text style={styles.readMore}>
									Read More...
								</Text>
							</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
		marginTop: 40,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
	},
	profilePic: {
		width: 40,
		height: 40,
		borderRadius: 20,
	},
	profileInfo: {
		marginLeft: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: "bold",
	},
	locationContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	locationDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#444",
		marginRight: 4,
	},
	location: {
		fontSize: 12,
		color: "#666",
	},
	bellIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
	bellIconText: {
		fontSize: 16,
	},
	sessionCard: {
		backgroundColor: GlobalStyles.colors.primary,
		borderRadius: 12,
		margin: 16,
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	sessionInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	clockIcon: {
		marginRight: 8,
	},
	sessionLabel: {
		color: "#fff",
		fontSize: 12,
	},
	sessionTime: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},
	editButton: {
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
	},
	editButtonText: {
		color: "#f54242",
		fontWeight: "bold",
	},
	workoutCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		margin: 16,
		marginTop: 0,
		padding: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 12,
	},
	progressSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 4,
	},
	progressLabel: {
		fontSize: 14,
	},
	progressValue: {
		fontSize: 14,
		color: GlobalStyles.colors.primary,
		fontWeight: "500",
	},
	progressBar: {
		height: 8,
		backgroundColor : "#e0e0e0",
		borderRadius: 4,
		marginBottom: 16,
	},
	progressFill: {
		height: 8,
		backgroundColor: GlobalStyles.colors.primary,
		borderRadius: 4,
	},
	viewMoreButton: {
		backgroundColor: "#e0e0e0",
		borderRadius: 20,
		padding: 8,
		alignSelf: "center",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		marginTop: 8,
	},
	viewMoreText: {
		color: "#444",
		fontSize: 14,
	},
	arrowIcon: {
		marginLeft: 4,
		fontSize: 16,
		color: "#444",
	},
	goalsCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		margin: 16,
		marginTop: 0,
		padding: 16,
	},
	subTitle: {
		fontSize: 12,
		color: "#666",
		marginTop: -8,
		marginBottom: 12,
	},
	achievementSection: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	achievementText: {
		fontSize: 14,
		fontWeight: "bold",
	},
	weekCircles: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "70%",
	},
	dayCircle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
	},
	dayComplete: {
		backgroundColor: "#4CAF50",
		borderColor: "#4CAF50",
	},
	dayPartial: {
		borderColor: "#f54242",
		backgroundColor: "transparent",
	},
	dayIncomplete: {
		borderColor: "#f54242",
		backgroundColor: "#f54242",
	},
	dayEmpty: {
		borderColor: "#e0e0e0",
		backgroundColor: "transparent",
	},
	dayPointer: {
		alignItems: "center",
		position: "relative",
		marginTop: -12,
	},
	pointerText: {
		color: "#8B44FF",
		fontSize: 16,
	},
	nameTag: {
		backgroundColor: "#8B44FF",
		paddingHorizontal: 8,
		paddingVertical: 2,
		borderRadius: 4,
	},
	nameTagText: {
		color: "#fff",
		fontSize: 12,
	},
	latestSection: {
		backgroundColor: "#fff",
		borderRadius: 12,
		margin: 16,
		marginTop: 0,
		padding: 16,
		flexDirection: "column",
	},
	latestHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	viewAllText: {
		color: "#f54242",
		fontSize: 14,
	},
	friendContainer: {
		marginBottom: 16,
		borderBottomColor : "#e0e0e0",
		borderBottomWidth: 1,
		paddingBottom: 16,
	},
	friendUpdate: {
		flexDirection: "column",
	},
	friendPic: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 12,
		marginBottom: 12,
	},
	friendInfo: {
		flex: 1,
	},
	friendName: {
		fontSize: 14,
		fontWeight: "bold",
	},
	friendLocation: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	friendLocationText: {
		fontSize: 12,
		color: "#666",
	},
	friendPostText: {
		fontSize: 12,
		color: "#333",
		lineHeight: 18,
	},
	readMore: {
		color: "#f54242",
		fontWeight: "bold",
	},
});

export default HomeScreen;
