import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";
import { FlatList } from "react-native-gesture-handler";

function MealCalories() {
	const initialData = [
		{
			date: "Saturday, 31 Jan, 8:39 AM",
			meal: "Breakfast",
			calories: "500 Cal",
		},
		{
			date: "Saturday, 31 Jan, 12:30 PM",
			meal: "Lunch",
			calories: "700 Cal",
		},
		{
			date: "Saturday, 31 Jan, 7:00 PM",
			meal: "Dinner",
			calories: "600 Cal",
		},
		{
			date: "Saturday, 31 Jan, 7:00 PM",
			meal: "Dinner",
			calories: "600 Cal",
		},
		{
			date: "Saturday, 31 Jan, 7:00 PM",
			meal: "Dinner",
			calories: "600 Cal",
		},
		{
			date: "Saturday, 31 Jan, 7:00 PM",
			meal: "Dinner",
			calories: "600 Cal",
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={initialData}
				renderItem={({ item }) => (
					<View style={styles.boxContainer}>
						<View style={styles.leftContainer}>
							<Text style={styles.dateText}>{item.date}</Text>
							<Text style={styles.leftTitle}>{item.meal}</Text>
						</View>
						<View style={styles.rightContainer}>
							<Text style={styles.rightTitle}>
								{item.calories}
							</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
}

export default MealCalories;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
	},
	boxContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		alignItems: "flex-end",
	},
	leftContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	leftTitle: {
		fontSize: 20,
		fontWeight: "bold",
		// color: GlobalStyles.colors.primary,
	},
	rightTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: GlobalStyles.colors.primary,
	},
	dateText: {
		fontSize: 12,
	},
});
