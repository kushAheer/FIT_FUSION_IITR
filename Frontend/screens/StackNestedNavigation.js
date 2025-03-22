import { createStackNavigator } from "@react-navigation/stack";
import ScheduleScreen from "./ScheduleScreen";
import ScheduleDetailScreen from "./ScheduleDetailScreen";

import Ionicons from "react-native-vector-icons/Ionicons";
import NutritionScreen from "./NutritionScreen";

const Stack = createStackNavigator();

export function ScheduleNestedNavigation({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="ScheduleScreen">
			<Stack.Screen
				name="ScheduleScreen"
				component={ScheduleScreen}
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name="ScheduleDetailScreen"
				component={ScheduleDetailScreen}
				options={{
					headerShown: true,
					headerTitle: "",
					headerRight: ({ color }) => (
						<Ionicons
							name="pencil-outline"
							size={30}
							color={color}
							style={{ marginRight: 20 }}
							//   onPress={() => navigation.goBack()}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}

export function NutritionNestedNavigation({ navigation }) {
	return (
		<Stack.Navigator initialRouteName="NutritionScreen">
			<Stack.Screen
				name="NutritionScreen"
				component={NutritionScreen}
				options={{
					headerShown: false,
				}}
			></Stack.Screen>
			<Stack.Screen
				name="NutritionDetailScreen"
				component={ScheduleDetailScreen}
				options={{
					headerShown: true,
					headerTitle: "",
					headerRight: ({ color }) => (
						<Ionicons
							name="pencil-outline"
							size={30}
							color={color}
							style={{ marginRight: 20 }}
							//   onPress={() => navigation.goBack()}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
}
