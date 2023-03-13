import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const INTERESTS = [
    "💪 Gym",
    "🎮 Gaming",
    "💃 Dancing",
    "🌍 Languages",
    "🎵 Music",
    "😊 People",
    "📸 Photography",
    "🎬 Movies",
    "🏘️ Architecture",
    "👗 Fashion",
    "📚 Books",
    "✍️ Writing",
    "🍂 Nature",
    "🎨 Painting",
    "⚽ Football",
    "🐨 Animals",

]
//TODO: optimise the color changing when pressing button

const INITIAL_STATE=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]

const SelectInterests = () => {
    const [selected, setSelected] = useState(INITIAL_STATE)
    return (
        <View className="w-full items-center px-8">
            <Text className="font-bold text-2xl text-primary mb-8">Select up to 5 interests</Text>
            <View className="flex-wrap flex-row items-center justify-center">
                {INTERESTS.map((e, i) => {
                    return <TouchableOpacity
                        activeOpacity={0.8}
                        key={i}
                        className="p-2 rounded-full border mx-1 my-1"
                        style={selected[i] ? { backgroundColor: "#E29BD7", borderColor: "transparent" } : { backgroundColor: "white", borderColor: "#d1d5db" }}
                        onPress={() => setSelected(e => {
                            selected[i] = !selected[i]
                            return [...selected]
                        })}
                        >
                        <Text className="text-lg">{e}</Text>
                    </TouchableOpacity>
                })}
            </View>
        </View>
    )
}

export default SelectInterests