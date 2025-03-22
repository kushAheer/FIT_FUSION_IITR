import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { GlobalStyles } from "../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

export function Setup({ navigation, authHandler }) {
	const [currentStep, setCurrentStep] = useState(1);
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		dob: "",
		weight: "",
		height: "",
		diet: "",
		goals: "",
		availableMess: "",
	});
	const [passwordError, setPasswordError] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const updateUserData = (field, value) => {
		setUserData({ ...userData, [field]: value });
		if (formErrors[field]) {
			setFormErrors({ ...formErrors, [field]: "" });
		}
		if (field === "confirmPassword" && userData.password !== value) {
			setPasswordError("Passwords do not match");
		} else if (field === "confirmPassword" && userData.password === value) {
			setPasswordError("");
		}
	};
	const validateStep = () => {
		const errors = {};
		if (currentStep === 1) {
			if (!userData.name.trim()) errors.name = "Name is required";
			if (!userData.email.trim()) errors.email = "Email is required";
			if (!userData.email.includes("@"))
				errors.email = "Enter a valid email";
			if (!userData.password) errors.password = "Password is required";
			if (userData.password.length < 6)
				errors.password = "Password must be at least 6 characters";
			if (userData.password !== userData.confirmPassword)
				errors.confirmPassword = "Passwords do not match";
		}
		if (currentStep === 2) {
			if (!userData.dob) errors.dob = "Date of birth is required";
			if (!userData.weight) errors.weight = "Weight is required";
			if (!userData.height) errors.height = "Height is required";
		}

		if (currentStep === 3) {
			if (!userData.diet) errors.diet = "Diet preference is required";
			if (!userData.goals) errors.goals = "Goals are required";
		}
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};
	const handleNext = () => {
		if (validateStep()) {
			if (currentStep < 4) {
				setCurrentStep(currentStep + 1);
			} else {
				completeSetup();
			}
		}
	};
	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};
	const completeSetup = async () => {
		try {
			await AsyncStorage.setItem("userData", JSON.stringify(userData));

			await AsyncStorage.setItem("setupComplete", "true");
			const fileUri = FileSystem.documentDirectory + "userData.json";
			await FileSystem.writeAsStringAsync(
				fileUri,
				JSON.stringify(userData)
			);
			console.log("User data saved to file:", fileUri);
			// navigation.navigate("Login");
			authHandler();
		} catch (error) {
			console.error("Error saving user data", error);
		}
	};
	const renderStep1 = () => (
		<View style={styles.formContainer}>
			<Text style={styles.stepTitle}>Create Your Account</Text>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Full Name</Text>
				<TextInput
					style={styles.input}
					value={userData.name}
					onChangeText={(text) => updateUserData("name", text)}
					placeholder="Enter your full name"
				/>
				{formErrors.name ? (
					<Text style={styles.errorText}>{formErrors.name}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={userData.email}
					onChangeText={(text) => updateUserData("email", text)}
					placeholder="Enter your email"
					keyboardType="email-address"
					autoCapitalize="none"
				/>
				{formErrors.email ? (
					<Text style={styles.errorText}>{formErrors.email}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					value={userData.password}
					onChangeText={(text) => updateUserData("password", text)}
					placeholder="Create a password"
					secureTextEntry
				/>
				{formErrors.password ? (
					<Text style={styles.errorText}>{formErrors.password}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Confirm Password</Text>
				<TextInput
					style={styles.input}
					value={userData.confirmPassword}
					onChangeText={(text) =>
						updateUserData("confirmPassword", text)
					}
					placeholder="Confirm your password"
					secureTextEntry
				/>
				{formErrors.confirmPassword ? (
					<Text style={styles.errorText}>
						{formErrors.confirmPassword}
					</Text>
				) : null}
				{passwordError ? (
					<Text style={styles.errorText}>{passwordError}</Text>
				) : null}
			</View>
		</View>
	);
	const renderStep2 = () => (
		<View style={styles.formContainer}>
			<Text style={styles.stepTitle}>Personal Details</Text>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Date of Birth</Text>
				<TextInput
					style={styles.input}
					value={userData.dob}
					onChangeText={(text) => updateUserData("dob", text)}
					placeholder="DD/MM/YYYY"
				/>
				{formErrors.dob ? (
					<Text style={styles.errorText}>{formErrors.dob}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Weight (kg)</Text>
				<TextInput
					style={styles.input}
					value={userData.weight}
					onChangeText={(text) => updateUserData("weight", text)}
					placeholder="Enter your weight"
					keyboardType="numeric"
				/>
				{formErrors.weight ? (
					<Text style={styles.errorText}>{formErrors.weight}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Height (cm)</Text>
				<TextInput
					style={styles.input}
					value={userData.height}
					onChangeText={(text) => updateUserData("height", text)}
					placeholder="Enter your height"
					keyboardType="numeric"
				/>
				{formErrors.height ? (
					<Text style={styles.errorText}>{formErrors.height}</Text>
				) : null}
			</View>
		</View>
	);

	const renderStep3 = () => (
		<View style={styles.formContainer}>
			<Text style={styles.stepTitle}>Preferences</Text>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Diet Preference</Text>
				<View style={styles.dietOptionsContainer}>
					{[
						"Vegan",
						"Vegetarian(no egg)",
						"Eggetarian",
						"Non-Vegetarian",
					].map((diet) => (
						<TouchableOpacity
							key={diet}
							style={[
								styles.dietOption,
								userData.diet === diet
									? styles.selectedDietOption
									: {},
							]}
							onPress={() => updateUserData("diet", diet)}
						>
							<Text
								style={[
									styles.dietOptionText,
									userData.diet === diet
										? styles.selectedDietOptionText
										: {},
								]}
							>
								{diet}
							</Text>
						</TouchableOpacity>
					))}
				</View>
				{formErrors.diet ? (
					<Text style={styles.errorText}>{formErrors.diet}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Fitness Goals</Text>
				<TextInput
					style={styles.input}
					value={userData.goals}
					onChangeText={(text) => updateUserData("goals", text)}
					placeholder="Weight loss, muscle gain, etc."
				/>
				{formErrors.goals ? (
					<Text style={styles.errorText}>{formErrors.goals}</Text>
				) : null}
			</View>

			<View style={styles.inputGroup}>
				<Text style={styles.label}>Available Mess</Text>
				<TextInput
					style={styles.input}
					value={userData.availableMess}
					onChangeText={(text) =>
						updateUserData("availableMess", text)
					}
					placeholder="Enter mess name or location"
				/>
				{formErrors.availableMess ? (
					<Text style={styles.errorText}>
						{formErrors.availableMess}
					</Text>
				) : null}
			</View>
		</View>
	);
	const renderStep4 = () => (
		<View style={styles.formContainer}>
			<Text style={styles.stepTitle}>Review Your Information</Text>

			<View style={styles.reviewContainer}>
				<View style={styles.reviewSection}>
					<Text style={styles.reviewSectionTitle}>Account</Text>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Name:</Text>
						<Text style={styles.reviewValue}>{userData.name}</Text>
					</View>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Email:</Text>
						<Text style={styles.reviewValue}>{userData.email}</Text>
					</View>
				</View>

				<View style={styles.reviewSection}>
					<Text style={styles.reviewSectionTitle}>Personal</Text>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Date of Birth:</Text>
						<Text style={styles.reviewValue}>{userData.dob}</Text>
					</View>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Weight:</Text>
						<Text style={styles.reviewValue}>
							{userData.weight} kg
						</Text>
					</View>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Height:</Text>
						<Text style={styles.reviewValue}>
							{userData.height} cm
						</Text>
					</View>
				</View>

				<View style={styles.reviewSection}>
					<Text style={styles.reviewSectionTitle}>Preferences</Text>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Diet:</Text>
						<Text style={styles.reviewValue}>{userData.diet}</Text>
					</View>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Goals:</Text>
						<Text style={styles.reviewValue}>{userData.goals}</Text>
					</View>
					<View style={styles.reviewItem}>
						<Text style={styles.reviewLabel}>Mess:</Text>
						<Text style={styles.reviewValue}>
							{userData.availableMess}
						</Text>
					</View>
				</View>
			</View>

			<Text style={styles.disclaimer}>
				By completing Setup, you agree to our Terms and Privacy Policy.
			</Text>
		</View>
	);
	const renderCurrentStep = () => {
		switch (currentStep) {
			case 1:
				return renderStep1();
			case 2:
				return renderStep2();
			case 3:
				return renderStep3();
			case 4:
				return renderStep4();
			default:
				return renderStep1();
		}
	};
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerText}>Welcome to FitFusion</Text>
					<Text style={styles.subHeader}>
						Let's set up your profile
					</Text>
				</View>

				<View style={styles.progressContainer}>
					{[1, 2, 3, 4].map((step) => (
						<View
							key={step}
							style={[
								styles.progressStep,
								currentStep >= step ? styles.activeStep : {},
							]}
						/>
					))}
				</View>

				{renderCurrentStep()}

				<View style={styles.buttonContainer}>
					{currentStep > 1 && (
						<TouchableOpacity
							style={styles.backButton}
							onPress={handleBack}
						>
							<Text style={styles.backButtonText}>Back</Text>
						</TouchableOpacity>
					)}

					<TouchableOpacity
						style={[
							styles.nextButton,
							currentStep === 1 ? { flex: 2 } : { flex: 1 },
						]}
						onPress={handleNext}
					>
						<Text style={styles.nextButtonText}>
							{currentStep === 4 ? "Complete Setup" : "Next"}
						</Text>
					</TouchableOpacity>
				</View>
				<View
					style={{
						alignContent: "center",
						alignItems: "center",
					}}
				>
					<Text>Already have an account? </Text>

					<Text
						onPress={() => navigation.navigate("Login")}
						style={{ color: GlobalStyles.colors.primary }}
					>
						{" "}
						Login{" "}
					</Text>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: GlobalStyles.colors.backgroundColor,
	},
	header: {
		padding: 20,
		alignItems: "center",
		marginTop: 40,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: GlobalStyles.colors.primary,
	},
	subHeader: {
		fontSize: 16,
		color: GlobalStyles.colors.gray100,
		marginTop: 8,
	},
	progressContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginVertical: 20,
	},
	progressStep: {
		width: 40,
		height: 4,
		backgroundColor: GlobalStyles.colors.gray,
		marginHorizontal: 4,
		borderRadius: 2,
	},
	activeStep: {
		backgroundColor: GlobalStyles.colors.primary,
	},
	formContainer: {
		padding: 20,
	},
	stepTitle: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 20,
		color: GlobalStyles.colors.black,
	},
	inputGroup: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		marginBottom: 6,
		color: GlobalStyles.colors.gray100,
	},
	input: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#ddd",
	},
	errorText: {
		color: "red",
		fontSize: 12,
		marginTop: 4,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 20,
		marginBottom: 15,
	},
	backButton: {
		padding: 15,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: GlobalStyles.colors.primary,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		marginRight: 10,
	},
	backButtonText: {
		color: GlobalStyles.colors.primary,
		fontWeight: "500",
	},
	nextButton: {
		backgroundColor: GlobalStyles.colors.primary,
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	nextButtonText: {
		color: "#fff",
		fontWeight: "500",
	},
	reviewContainer: {
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 16,
		marginBottom: 20,
	},
	reviewSection: {
		marginBottom: 16,
		paddingBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#eee",
	},
	reviewSection: {
		marginBottom: 16,
	},
	reviewSectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
		color: GlobalStyles.colors.primary,
	},
	reviewItem: {
		flexDirection: "row",
		marginBottom: 4,
	},
	reviewLabel: {
		width: 100,
		fontSize: 14,
		color: GlobalStyles.colors.gray100,
	},
	reviewValue: {
		flex: 1,
		fontSize: 14,
		color: GlobalStyles.colors.black,
	},
	dietOptionsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginBottom: 8,
	},
	dietOption: {
		borderWidth: 1,
		borderColor: GlobalStyles.colors.gray,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginRight: 8,
		marginBottom: 8,
	},
	selectedDietOption: {
		backgroundColor: GlobalStyles.colors.primary,
		borderColor: GlobalStyles.colors.primary,
	},
	dietOptionText: {
		color: GlobalStyles.colors.gray100,
	},
	selectedDietOptionText: {
		color: "#fff",
	},
	disclaimer: {
		fontSize: 12,
		color: GlobalStyles.colors.gray100,
		textAlign: "center",
		marginTop: 20,
	},
});
export default Setup;
