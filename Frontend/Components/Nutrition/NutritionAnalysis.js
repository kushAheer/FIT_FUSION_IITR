import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";
import { FlatList } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";

const initialData = [
	{
		name: "Calories",
		value: 2000,
		total: 2500,
	},
	{
		name: "Protein",
		value: 100,
		total: 150,
	},
	{
		name: "Carbs",
		value: 200,
		total: 300,
	},
	{
		name: "Fat",
		value: 50,
		total: 70,
	},
	{
		name: "Fiber",
		value: 25,
		total: 30,
	},
	{
		name: "Sugar",
		value: 50,
		total: 60,
	},
	{
		name: "Sodium",
		value: 2000,
		total: 2500,
	},
	{
		name: "Cholesterol",
		value: 300,
		total: 400,
	},
	{
		name: "Vitamin A",
		value: 100,
		total: 150,
	},
	{
		name: "Vitamin C",
		value: 100,
		total: 150,
	},
	{
		name: "Calcium",
		value: 100,
		total: 150,
	},
	{
		name: "Iron",
		value: 100,
		total: 150,
	},
];

function NutritionAnalysis() {
	return (
		<View style={styles.boxContainer}>
			<Text style={styles.titleText}>My Goals</Text>
			<View style={styles.itemContainer}>
				<FlatList
					data={initialData}
					renderItem={({ item }) => (
						<View style={styles.itemBox}>
							<View style={styles.item}>
								<Text style={styles.subText}>{item.name}</Text>
								<View style={styles.totalItemContainer}>
									<Text style={styles.subTextValue}>{`${item.value}`}</Text>
									<Text style={styles.subText}>{`/${item.total} gm`}</Text>
								</View>
							</View>
							<ProgressBar
								progress={item.value / item.total}
								color={GlobalStyles.colors.primary}
								style={styles.progressBar}
							/>
						</View>
					)}
				/>
			</View>
		</View>
	);
}

export default NutritionAnalysis;

const styles = StyleSheet.create({
	boxContainer: {
		flex: 1,

		gap: 16,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: GlobalStyles.colors.gray,
		padding: 16,
		paddingRight: 0,
		borderRadius: 16,
	},
	titleText: {
		fontSize: 20,
		color: GlobalStyles.colors.black,
	},
	totalItemContainer :{
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	subText: {
		fontSize: 16,
		color: GlobalStyles.colors.black,
		fontWeight: "bold",
	},
	subTextValue: {
		fontSize: 16,
		color: GlobalStyles.colors.primary,
	},
	itemContainer: {
		flex: 1,

		
		

	},
	itemBox: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "space-between",
		marginTop: 16,
		marginBottom: 16,
		gap: 8,
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginRight: 16,
		
	},
	progressBar: {
		height: 12,
		width: 285,
		color: GlobalStyles.colors.primary,
		borderRadius: 16,
	},
});
