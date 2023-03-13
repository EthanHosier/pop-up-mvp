import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import WhatsYourName from './subscreens/WhatsYourName';
import WhatsYourGender from './subscreens/WhatsYourGender';
import SelectInterests from './subscreens/SelectInterests';
import UploadYourPhotos from './subscreens/UploadYourPhotos';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing } from 'react-native-reanimated'
import useAuth from '../../hooks/useAuth';

const NUM_OF_SCREENS = 4;
const windowWidth = Dimensions.get("window").width;
const PX_8 = 32;

const UserDetails = () => {
    const {signout} = useAuth();

    const offset = useSharedValue(0);
    const [index, setIndex] = useState(-0)
    const [name, setName] = useState();
    const [gender, setGender] = useState();

    const animatedViewStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: -offset.value }]
        }
    });

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(((windowWidth - 2 * PX_8) * (index + 1) / NUM_OF_SCREENS))
        };
    });

    const next = () => {
        Keyboard.dismiss()
        //offset.value = withSpring((index + 1) * windowWidth)
        offset.value = withTiming((index + 1) * windowWidth, {
            duration: 800,
            easing: Easing.out(Easing.exp),
          });

        setIndex(i => i + 1)
    }

    const prev = () => {
        Keyboard.dismiss()
        //offset.value = withSpring((index - 1) * windowWidth)
        offset.value = withTiming((index - 1) * windowWidth, {
            duration: 800,
            easing: Easing.out(Easing.exp),
          });
        setIndex(i => i - 1)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
            keyboardVerticalOffset={-50} //makes up for padding of progress bar etc at bottom of screen
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <SafeAreaView className="bg-secondary flex-1 relative">
                    <TouchableOpacity
                        className="border rounded-full items-center w-12 h-12 justify-center border-gray-300 ml-5 mt-5"
                        onPress={() => index > 0 && prev()}
                    >
                        <Ionicons name="chevron-back-sharp" size={24} color="black" />
                    </TouchableOpacity>


                    <Animated.View style={animatedViewStyles}>
                        <View className="flex-row h-full mt-4">
                            <WhatsYourName name={name} setName={setName}/>
                            <WhatsYourGender name={name}/>
                            <SelectInterests/>
                            <UploadYourPhotos />
                        </View>
                    </Animated.View>


                    <View className="absolute bottom-20 w-full px-8 ">
                        <View className="justify-between flex-row w-64 w-full items-end">
                            <Text className="text-primary text-xl font-bold">{index + 1}
                                <Text className="text-tertiary font-semibold">/{NUM_OF_SCREENS}</Text></Text>
                            <TouchableOpacity
                                className="bg-primary rounded-full p-4 aspect-square items-center justify-center"
                                onPress={() => index < NUM_OF_SCREENS - 1 && next()}
                            >
                                <Ionicons name="ios-arrow-forward-sharp" size={24} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View className="w-full h-2 mt-3 rounded-full" style={{ backgroundColor: "#F4DEF1" }}>
                            <Animated.View className="bg-tertiary h-full rounded-full" style={[progressStyle]} />
                        </View>
                    </View>

                </SafeAreaView>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>

    )
}

export default UserDetails