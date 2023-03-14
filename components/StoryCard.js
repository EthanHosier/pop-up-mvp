import { View, Text, Image, Dimensions, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SharedElement } from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';


const margin = 16;
const width = Dimensions.get("window").width / 2 - margin * 2;

const StoryCard = ({ id }) => {
  const navigation = useNavigation();
  const [opacity, setOpacity] = useState(1);

  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  });

  return (
    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        setOpacity(0);
        navigation.navigate("Story", { id });
      }}
    >



      <View style={{ opacity }} className="relative">
        <SharedElement id={`item.${id}`}>
          <Image
            source={require("../assets/images/mirrorSelfie-min.jpg")}
            style={{ width, height: width * 1.77, overflow: "hidden" }}
            height={20}
            width={20}
            className="rounded-lg"
          />
        </SharedElement>

        <SharedElement id={`details.${id}`}>
          <LinearGradient className="absolute bottom-0 w-full rounded-b-lg h-20 justify-end" colors={['transparent', "#4C214C",]}>

          </LinearGradient>
        </SharedElement>

        <View className="absolute bottom-0 w-full pl-2 mb-2">
          <Text className="text-white font-semibold">Ethan Hosier, 19</Text>
          <Text className="text-white">⚡ Personal Trainer</Text>
        </View>


      </View>


    </Pressable>

  )
}

export default StoryCard