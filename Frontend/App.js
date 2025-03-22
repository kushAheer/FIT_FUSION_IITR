import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "./screens/BottomNavigation";
import { GlobalStyles } from "./constants/color";
import LoginScreen from './screens/LoginScreen';
import FitnessAnalysis from './screens/FitnessAnalysis';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setup, { singup } from './screens/setup';


const Stack = createStackNavigator();

export default function App() {

	const [isAuth , setIsAuth] = useState(false)
	const loginHandler = ()=>{
		setIsAuth((prev)=>!prev)
	}
	return (
		<>
			<StatusBar style="auto" />
			<NavigationContainer>
				<Stack.Navigator>
					{!isAuth ? (
						<>
							<Stack.Screen name="Register" component={setup} options={{ headerShown: false }} />
							<Stack.Screen
								name="Login"
								component={BottomNavigation}
								options={{ headerShown: false }}
							/>
						</>
					) : (
						<Stack.Screen
							name="BottomNavigation"
							options={{ headerShown: false }}
							children={(props) => <BottomNavigation {...props} authHandler={authHandler} />} // Pass authHandler
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