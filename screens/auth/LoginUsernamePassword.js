import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { RulePassword, RuleConfirmPassword, RuleEmail } from "../../utils/rules"
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import useAuth from '../../hooks/useAuth';

const LoginUsernamePassword = () => {

    const { signInEmailPassword } = useAuth();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [showPwd, setShowPwd] = useState(false)
    const [emailError, setEmailError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [checkboxPressed, setCheckboxPressed] = useState(false)
    const [isLoading, setIsLoading] = useState();
    const [loginError, setLoginError] = useState("");

    //TODO: Fix this so not calculated on every render
    const disabled = isLoading || emailError || pwdError || !checkboxPressed || !email || !pwd

    const handleLogin = async () => {
        
        setIsLoading(true)
        const id = setTimeout(() => {
            setIsLoading(false)
            setLoginError("Timeout Error")
        }, 15000);


        const errorCode = await signInEmailPassword(email, pwd);
        clearTimeout(id)

        if (!errorCode) return;
        setIsLoading(false)
        setLoginError("Invalid email and password")
    }

    const handleGoTerm = () => {
    }

    const handleGoPrivacy = () => {
    }

    const handleChangeEmail = (text) => {
        setEmail(text)
        if (RuleEmail.pattern.value.test(text)) {
            setEmailError("")
            return;
        }

        //invalid input
        if (text) {
            setEmailError(RuleEmail.pattern.message);
            return;
        }

        setEmailError(RuleEmail.required.message)
    }

    const handlePassword = (text) => {
        setPwd(text)
        if (text.length >= RulePassword.minLength.value) {
            setPwdError("")
            return;
        }

        //invalid input
        if (text) {
            setPwdError(RulePassword.minLength.message);
            return;
        }

        setPwdError(RulePassword.required.message)
    }

    //TODO: move keyboard avoiding view outside and fix the css issues with that.
    return (
        <SafeAreaView className="h-full flex-1 bg-secondary items-center justify-center">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <KeyboardAvoidingView className="w-5/6" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                    <Text className="text-center text-2xl font-bold text-primary">
                        Enter your username and password
                    </Text>


                    <View className="h-16 mt-10 mx-3">
                        <TextInput
                            className="bg-white rounded-lg h-12 px-4 text-black w-full"
                            placeholder='Email'
                            onChangeText={handleChangeEmail}
                            value={email}
                            keyboardType="email-address"
                            style={{ borderWidth: 1, borderColor: emailError ? "#4C214C" : "transparent" }}
                            autoComplete="email"
                        />
                        <Text className="text-primary text-xs">{emailError}</Text>
                    </View>



                    <View className="h-16 mt-4 mx-3">
                        <View className="flex-row items-center bg-white rounded-lg"
                            style={{ borderWidth: 1, borderColor: pwdError ? "#4C214C" : "transparent" }}

                        >
                            <TextInput
                                className="bg-white rounded-lg h-12 px-4 text-black flex-1"
                                placeholder='Password'
                                onChangeText={handlePassword}
                                value={pwd}
                                autoComplete="password-new"
                                secureTextEntry={!showPwd}

                            />
                            <TouchableOpacity className=" py-2 pl-1 pr-3" onPress={() => setShowPwd(prev => !prev)}>
                                <Entypo name={showPwd ? "eye" : "eye-with-line"} size={24} color="#4C214C" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-primary text-xs">{pwdError}</Text>
                    </View>



                    <View className="flex-row mt-4 mx-3">
                        <BouncyCheckbox
                            size={20}
                            fillColor={"#E29BD7"}
                            unfillColor={"#FFFFFF"}
                            iconStyle={{ borderRadius: 4 }}
                            innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
                            onPress={setCheckboxPressed}


                        />
                        <Text className="flex-1">
                            <Text>I agree to the </Text>
                            <Text onPress={handleGoTerm} className="text-tertiary">Terms of Service</Text>
                            <Text> and </Text>
                            <Text onPress={handleGoPrivacy} className="text-tertiary">Privacy Policy</Text>
                        </Text>
                    </View>



                    <TouchableOpacity
                        activeOpacity={0.8}
                        className="w-full bg-sky-400 rounded-full items-center justify-center h-12  mt-10"
                        onPress={handleLogin}
                        disabled={disabled}
                        style={{ backgroundColor: /*disabled ? "black" :*/ "#4C214C" }}
                    >
                        {
                            isLoading ?
                                <ActivityIndicator />
                                : <Text className="uppercase text-white text-md">Login</Text>

                        }

                    </TouchableOpacity>
                    <View className="h-8 items-center justify-center -mb-8">
                        <Text className="text-primary text-xs">{loginError}</Text>
                    </View>
                </KeyboardAvoidingView >
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default LoginUsernamePassword