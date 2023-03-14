import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import { SharedElement } from 'react-navigation-shared-element';
import { PanGestureHandler, ScrollView } from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
    Easing,
    FadeInDown
} from "react-native-reanimated";
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import DetailsSheet from '../../components/DetailsSheet';

const { height, width } = Dimensions.get("window");
const ENTERING_ANIMATION = FadeInDown.delay(250);

const Story = () => {
    const navigation = useNavigation();
    const { id, gender, name, picUrl } = useRoute().params;
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const isGestureActive = useSharedValue(false)

    const onGestureEvent = useAnimatedGestureHandler({
        onStart: () => {
            isGestureActive.value = true;
        },
        onActive: ({ translationX, translationY }) => {
            translateX.value = translationX;
            translateY.value = translationY;
        },
        onEnd: ({ velocityX, velocityY }) => {
            //const goBack = snapPoint(translateY.value, velocityY, [300, height]) === height
            const goBack = translateY.value > 50 || Math.abs(translateX.value) > 50
            if (goBack) {
                runOnJS(navigation.goBack)();
                return;
            }

            /*
            translateX.value = withSpring(0, {velocity: velocityX});
            translateY.value = withSpring(0, {velocity: velocityY});
            */

            translateX.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.exp),
            });

            translateY.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.exp),
            });

            isGestureActive.value = false;
        }
    });
    const style = useAnimatedStyle(() => {
        const scale = interpolate(translateY.value, [0, height], [1, 0.5], Extrapolate.CLAMP)
        return {
            flex: 1,
            transform: [{ translateX: translateX.value * scale }, { translateY: translateY.value * scale }, { scale }]
        }
    })

    const borderStyle = useAnimatedStyle(() => ({ borderRadius: withTiming(isGestureActive.value ? 24 : 0) }))


    return (
        //copy example apps for how info comes in underneath image (photo acc looks god small so might be able to get away with popup underneath the image)
        //have the name, color gradient and detail underneath shared element aswell so smooth transition
        <Animated.View style={[style, borderStyle, {overflow:'hidden'}]} >
            <PanGestureHandler onGestureEvent={onGestureEvent}>

                <Animated.View className="relative">
                    <SharedElement id={`item.${id}`}>
                        <Animated.Image
                            source={picUrl? {uri:picUrl}: require("../../assets/images/mirrorSelfie-min.jpg")}
                            height={20}
                            width={20}
                            style={[{ height: height, width }, borderStyle]}
                        />
                    </SharedElement>

                    <SharedElement id={`details.${id}`}>
                        <LinearGradient className="absolute bottom-0 w-full rounded-b-3xl h-3/4 justify-end" colors={['transparent', "#4C214C",]} style={{ height: height / 2 }} />
                    </SharedElement>

                    {/* 
                    <Animated.View
                        className="absolute w-full items-center bottom-1/2 "
                        entering={ENTERING_ANIMATION}
                    >
                        <Text className="text-white/70 text-4xl font-semibold">Ethan Hosier, 19</Text>
                        <Text className="text-white/70 text-xl">Personal Trainer</Text>
                    </Animated.View>
                    */}
                </Animated.View>
            </PanGestureHandler>

            <Animated.View className="absolute bottom-50 w-full" entering={ENTERING_ANIMATION}>
                <DetailsSheet name={name} gender={gender} />
            </Animated.View>



        </Animated.View>





    )
}

export default Story