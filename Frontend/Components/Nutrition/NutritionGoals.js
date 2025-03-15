import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/color";
import Button from "../../UI/Button";
import { useState } from "react";
import NutritionAnalysis from "./NutritionAnalysis";

import MealCalories from "./MealCalories";


function NutritionGoals() {
	const [isActiveMenu, setIsActive] = useState("DAILY");

	const menuHandler = (menu) => {
		setIsActive(menu);
	};

	return (
		<View style={styles.container}>
			<View style={styles.boxContainer}>
				<Button
					isActive={isActiveMenu == "DAILY"}
					onPress={() => menuHandler("DAILY")}
				>
					Daily
				</Button>
				<Button
					isActive={isActiveMenu == "WEEKLY"}
					onPress={() => menuHandler("WEEKLY")}
				>
					Weekly
				</Button>
				<Button
					isActive={isActiveMenu == "MONTHLY"}
					onPress={() => menuHandler("MONTHLY")}
				>
					Monthly
				</Button>
			</View>
            <NutritionAnalysis />
            <MealCalories />
		</View>
	);
}

export default NutritionGoals;

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: GlobalStyles.colors.backgroundColor,
	},

	boxContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		
		alignItems: "center",
        margin:0


	},
	isActive: {
		backgroundColor: GlobalStyles.colors.secondary,
	},
});
