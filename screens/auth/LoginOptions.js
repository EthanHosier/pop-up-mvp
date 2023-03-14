import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/core';

const LoginOptions = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 items-center justify-center h-full bg-white">

            <View className="w-5/6 items-center">
                <Image
                    style={{ resizeMode: "contain", width: "100%", height: 300 }}
                    source={require("../../assets/images/LoginOptions.png")}
                />

                <Text className="text-black font-bold text-center text-2xl">
                    Let's meet new people around you
                </Text>

                <TouchableOpacity 
                className="rounded-full w-full items-center justify-center h-14 bg-primary mt-6 flex-row relative"
                onPress={() => navigation.navigate("LoginUsernamePassword")}
                >
                    <View className="bg-white rounded-full absolute left-2 w-10 h-10 items-center justify-center">
                        <AntDesign name="user" size={24} color="#4C214C" />
                    </View>
                    <Text className="text-white font-semibold">Login with email / password</Text>
                </TouchableOpacity>

                <TouchableOpacity className="rounded-full w-full items-center justify-center h-14 bg-secondary mt-6 flex-row relative mt-4">
                    <View className="bg-white rounded-full absolute left-2 w-10 h-10 items-center justify-center">
                        <AntDesign name="google" size={24} color="#4C214C" />
                    </View>
                    <Text className="text-primary font-bold ">Login with Google</Text>
                </TouchableOpacity>
                <View className="flex-row items-center mt-4">
                    <Text className="text-sm">Don't have an account? </Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate("CreateAccountUsernamePassword")}
                    >
                        <Text className="text-tertiary font-bold text-sm">Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default LoginOptions