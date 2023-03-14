import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { RulePassword, RuleConfirmPassword, RuleEmail } from "../../utils/rules"
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import useAuth from '../../hooks/useAuth';

const CreateAccountUsernamePassword = () => {
    const {createUserEmailPassword} = useAuth();
    
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState();
    const [showPwd, setShowPwd] = useState(false)
    const [showConfirmPwd, setShowConfirmPwd] = useState(false)
    const [emailError, setEmailError] = useState("");
    const [pwdError, setPwdError] = useState("");
    const [confirmPwdError, setConfirmPwdError] = useState("")
    const [checkboxPressed, setCheckboxPressed] = useState(false)

    const [isLoading, setIsLoading] = useState();
    const [createAccountError, setCreateAccountError] = useState("");

    const disabled = emailError || !email || pwdError || !pwd || confirmPwdError || !confirmPwd || !checkboxPressed

    const handleCreateAccount = async () => {
        setIsLoading(true)
        const id = setTimeout(() => {
          setIsLoading(false)
          setCreateAccountError("Creating account took too long!")
        }, 15000);
    
        
        const errorCode = await createUserEmailPassword(email,pwd);
        clearInterval(id)
        
        setIsLoading(false)
        switch (errorCode){
          case 'auth/email-already-in-use':
            setCreateAccountError("Email address is already in use!")
            break;
    
          case 'auth/invalid-email':
            setCreateAccountError("Email address invalid!")
            break;
    
          default:
            setCreateAccountError("Error while creating account!")
        }

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

    //THIS IS BAD
    useEffect(() => {
        if (pwd === confirmPwd && pwd.length >= RulePassword.minLength.value) {
            setConfirmPwdError("")
            return
        }

        if(!confirmPwd) return

        setConfirmPwdError(RuleConfirmPassword.required.message)

    }, [confirmPwd, pwd])


    //TODO: move keyboard avoiding view outside and fix the css issues with that.
    return (
        <SafeAreaView className="h-full flex-1 bg-secondary items-center justify-center">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <KeyboardAvoidingView className="w-5/6" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                    <Text className="text-center text-2xl font-bold text-primary">
                        Enter your email and password
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

                    <View className="h-16 mt-4 mx-3">
                        <View className="flex-row items-center bg-white rounded-lg"
                            style={{ borderWidth: 1, borderColor: confirmPwdError ? "#4C214C" : "transparent" }}

                        >
                            <TextInput
                                className="bg-white rounded-lg h-12 px-4 text-black flex-1"
                                placeholder='Confirm Password'
                                onChangeText={setConfirmPwd}
                                value={confirmPwd}
                                autoComplete="password-new"
                                secureTextEntry={!showConfirmPwd}

                            />
                            <TouchableOpacity className=" py-2 pl-1 pr-3" onPress={() => setShowConfirmPwd(prev => !prev)}>
                                <Entypo name={showConfirmPwd? "eye" : "eye-with-line"} size={24} color="#4C214C" />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-primary text-xs">{confirmPwdError}</Text>
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
                        className="w-full bg-sky-400 rounded-full items-center justify-center  h-12 mt-10"
                        onPress={handleCreateAccount}
                        disabled={disabled}
                        style={{ backgroundColor: /*disabled ? "black" :*/ "#4C214C" }}
                    >
                    {
                        isLoading?
                        <ActivityIndicator/>
                        :
                        <Text className="text-white text-lg">Create Account</Text>
                    }
                    </TouchableOpacity>
                    <View className="h-8 items-center justify-center -mb-8">
                        <Text className="text-primary text-xs">{createAccountError}</Text>
                    </View>
                </KeyboardAvoidingView >
            </TouchableWithoutFeedback>

        </SafeAreaView>
    )
}

export default CreateAccountUsernamePassword