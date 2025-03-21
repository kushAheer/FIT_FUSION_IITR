import React, { useState } from "react";
import { View, Text , TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from "react-native-paper";
import { GlobalStyles } from "../constants/color";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, confirmpassword] = useState('');
    const navigation = useNavigation();
 
    const loginlogic = () => {        // once decided how we will handle multiple usernames it will be added 

        //logic of login will be here this is temp for some time to return back to
        navigation.navigate('HomeScreen');
    };
    return (
        <View style = {styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <TouchableOpacity
                style={styles.backButton}
                onPress={()=> navigation.goback()}
            >
                <Icon name = "arrow-back" size={24} color = '#000'  />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.loginHeader}>Login</Text>
                <TextInput
                    style = {styles.input}
                    label = "Enter Email or Username"
                    usernametextcolor = "#888"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style = {styles.input}
                    pass = "password"
                    passte0xtcolor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={confirmpassword}
                /> 
                <View style={styles.forgotpasscontainer}>
                    <Text style={styles.forgotpasstext}>Forgot Password</Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("forgot password")}>
                        <Text style= {styles.forgotpasslink}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Text style = {styles.loginBotton}>LOGIN</Text>
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