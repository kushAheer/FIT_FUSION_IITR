import React, { useState } from "react";
import { View, Text , TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-paper";
import { GlobalStyles } from "../constants/color";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const loginlogic = async () => {
        try {
            // Replace '.' with 'dot' in email for Firebase key compatibility
            const sanitizedEmail = email.replace(/\./g, "dot");

            // Fetch user data from Firebase
            const response = await fetch(`https://fit-fusion-db-default-rtdb.firebaseio.com/users/${sanitizedEmail}.json`);
            const userData = await response.json();

            if (!userData) {
                alert("User not found!");
                return;
            }

            // Validate password
            const isPasswordValid = await bcrypt.compare(password, userData.password);
            if (!isPasswordValid) {
                alert("Invalid password!");
                return;
            }

            alert(`Welcome back, ${userData.name}!`);
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error("Error logging in:", error.message);
            alert("An error occurred during login.");
        }
    };

    const signuplogic = async (name, age) => {
        try {
            // Replace '.' with 'dot' in email for Firebase key compatibility
            const sanitizedEmail = email.replace(/\./g, "dot");

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user in Firebase
            const response = await fetch(`https://fit-fusion-db-default-rtdb.firebaseio.com/users/${sanitizedEmail}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    age: age,
                    password: hashedPassword,
                }),
            });

            if (response.ok) {
                alert("User signed up successfully!");
                navigation.navigate('HomeScreen');
            } else {
                alert("Failed to sign up. Please try again.");
            }
        } catch (error) {
            console.error("Error signing up:", error.message);
            alert("An error occurred during signup.");
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.loginHeader}>Login</Text>
                <TextInput
                    style={styles.input}
                    label="Enter Email or Username"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    label="Enter Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <View style={styles.forgotpasscontainer}>
                    <Text style={styles.forgotpasstext}>Forgot Password</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("forgot password")}>
                        <Text style={styles.forgotpasslink}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={loginlogic}>
                    <Text style={styles.loginBotton}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => signuplogic("John Doe", 25)}>
                    <Text style={styles.loginBotton}>SIGNUP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.backgroundColor,
    },
    content: {                   
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    loginHeader: {
        fontSize: 28,
        fontWeight: "bold",
        color: GlobalStyles.colors.black,
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginBottom: 30,
        fontSize: 16,
        paddingVertical: 10,
    },
    forgotpasscontainer: {
        marginTop: 20,
        alignItems: 'center',

    },
    forgotpasstext: {
        fontSize: 16,
        color: GlobalStyles.colors.gray50,
        marginBottom: 10,
    },
    forgotpasslink: {
        color: GlobalStyles.colors.primary50,
        fontSize: 16,
        fontWeight: '500',
    },
    loginBotton: {
        backgroundColor: GlobalStyles.colors.primary,
        padding: 16,
        borderRadius: 8,
        marginTop: 40,
        alignItems: 'center',
    },
    loginBottontext: {
        color: GlobalStyles.colors.backgroundColor,
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 1,
      },
});

export default LoginScreen;