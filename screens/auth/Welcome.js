import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/core'

//POPPINS FONT
const Welcome = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView className="flex-1 items-center justify-center h-full">

            <View className="w-5/6 items-center">
                    <Image
                        style={{ resizeMode: "contain", width: "100%", height:300}}
                        source={require("../../assets/images/Welcome.png")}
                    />

                <Text className="text-black font-bold text-center text-2xl">
                    Make friends with people like you.
                </Text>

                <Text className="text-slate-500 font-semibold text-center text-md mt-3">
                    Interact with people with the same interests as you
                </Text>

                <TouchableOpacity 
                className="rounded-full w-full items-center justify-center py-5 bg-primary mt-6"
                onPress={() => navigation.navigate("LoginOptions")}
                >
                    <Text className="text-white font-semibold">Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                className="rounded-full py-5 w-full items-center justify-center bg-secondary mt-4"
                onPress={() => navigation.navigate("LoginOptions")}
                >
                    <Text className="text-primary font-semibold ">Sign In</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Welcome