import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./screens/BottomNavigation";
import { GlobalStyles } from "./constants/color";
import ScheduleDetailScreen from "./screens/ScheduleDetailScreen";
import LoginScreen from './screens/LoginScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import FitnessAnalysis from './screens/FitnessAnalysis';

const Stack = createStackNavigator();

export default function App() {
	const isAuth = true;
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator
			
				>
					{!isAuth ? (
						<Stack.Screen
						name = "Login"
						component={FitnessAnalysis}
						options={{ headerShown: false }}
						/> ) : (
						<Stack.Screen
							name="BottomNavigation"
							component={BottomNavigation}
							options={{
								headerShown: false,
							}}
						/>
					)}
					
				</Stack.Navigator>
				
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.backgroundColor,
	},
});
