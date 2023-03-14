import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, useAnimatedGestureHandler, withDecay, runOnJS, withTiming, Easing} from 'react-native-reanimated'

const { height } = Dimensions.get("window")
const WHITE_OVERFLOW_HEIGHT = 100;

const DetailsSheet = () => {
  const translateY = useSharedValue(0)
  const [maxDisplacement, setMaxDisplacement] = useState(0)
  const [isOverExtending, setIsOverExtending] = useState(false)

  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }]
    }
  })

  const handleLayout = (event) => {
    const { height: vHeight } = event.nativeEvent.layout;
    setMaxDisplacement(vHeight - height * 1 / 3 - WHITE_OVERFLOW_HEIGHT);
  }

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
      runOnJS(setIsOverExtending)(false);
      //setIsOverExtending(false)
    },
    onActive: (event, ctx) => {
      translateY.value = event.translationY + ctx.startY;

      // Overextension resistance
      if (translateY.value < -maxDisplacement) {
        translateY.value = -maxDisplacement - Math.log(-translateY.value / maxDisplacement) * 20
        runOnJS(setIsOverExtending)(true)
        //setIsOverExtending(true)
      }

      
      if (translateY.value > 0) {
        translateY.value = 0
      }
    },
    onEnd: (event) => {
      if (isOverExtending && event.velocityY < 0) {
        translateY.value = withTiming(-maxDisplacement, {
            duration: 500,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        runOnJS(setIsOverExtending)(false)
      } else {
        translateY.value = withDecay({
          velocity: event.velocityY * 0.7,
          clamp: [-maxDisplacement, 0],
          damping: 1,
        });
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View className="w-full absolute items-center" style={[{ top: height / 1.5 }, rBottomSheetStyle]} onLayout={handleLayout}>
        <Text className="text-white/80 text-4xl font-semibold">Ethan Hosier</Text>
        <Text className="text-white/80 text-xl">Personal Trainer</Text>
        <View className="bg-white/80 w-full mt-16 px-6 pb-8" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>

          <View className="flex-row justify-around mt-8">
            <Text style={{ fontSize: 16 }}>🗣️ He/Him</Text>
            <Text style={{ fontSize: 16 }}> ❤️ Single</Text>
            <Text style={{ fontSize: 16 }}>😁 19</Text>
          </View>

          <Text className="font-bold text-lg mt-8">About Me</Text>

          <Text className="mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat.</Text>
            

            <View style={{height: WHITE_OVERFLOW_HEIGHT}}>

            </View>

        </View>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default DetailsSheet