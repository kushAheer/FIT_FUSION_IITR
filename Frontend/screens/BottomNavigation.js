import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";
import { GlobalStyles } from "../constants/color";
import NutritionScreen from "./NutritionScreen";
import HomeScreen from "./HomeScreen";
import ScheduleScreen from "./ScheduleScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NutritionNestedNavigation, ScheduleNestedNavigation } from "./StackNestedNavigation";
import FitnessActivity from "./FitnessAnalysis";
import FitnessSocialApp from "./SocialScreen";

const Tab = createBottomTabNavigator();


function BottomNavigation() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerTitleAlign: "center",
				headerStyle: {
					shadowColor: "transparent",
					elevation: 0,
				},
				tabBarActiveTintColor: GlobalStyles.colors.primary,
				tabBarInactiveTintColor: GlobalStyles.colors.gray50,
				tabBarStyle: {
					height: 56,
					alignContent: "center",
					justifyContent: "center",
				},
                
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={() => ({
					headerShown: false,
					tabBarLabel: "Home",
					tabBarIcon: ({ color }) => (
						// <Icon source="home" color={color} size={26} />
						<Ionicons name="home-outline" color={color} size={26} />
					),
				})}
			/>
			<Tab.Screen
				name="social"
				component={FitnessSocialApp}
				options={() => ({
					tabBarLabel: "social",
					tabBarIcon: ({ color }) => (
						<Icon source="compass-outline" color={color} size={26} />
					),
				})}
			/>
			<Tab.Screen
				name="Schedule"
				component={ScheduleNestedNavigation}
				options={() => ({
					tabBarLabel: "Schedule",
					tabBarIcon: ({ color }) => (
						// <Icon source="plus" color={color} size={26} />
						<Ionicons name="add-circle-outline" color={color} size={26} />
					),
				})}
			/>
			<Tab.Screen
				name="Nutrition"
				component={NutritionNestedNavigation}
				options={() => ({
					tabBarLabel: "Nutrition",
					tabBarIcon: ({ color }) => (
						<Icon source="food-apple-outline" color={color} size={26} />
					),
				})}
			/>
			<Tab.Screen
				name="Analytics"
				component={FitnessActivity}
				options={() => ({
					tabBarLabel: "Analytics",
					tabBarIcon: ({ color }) => (
						// <Icon source="chart-bar" color={color} size={26} />
						<Ionicons name="trending-up" color={color} size={26} />
					),
				})}
			/>
		</Tab.Navigator>
	);
}

export default BottomNavigation;

const styles = StyleSheet.create({
	container: {
		
	},
});
