import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const GENDERS = [
    {
        gender: "Male",
        icon: "male"
    },
    {
        gender: "Female",
        icon: "female"
    },
    {
        gender: "Other",
        icon: "male-female"
    },
]

const WhatsYourGender = ({ name, setGender }) => {

    const [selected, setSelected] = useState(-1)

    return (

        <View className="w-full items-center justify px-8">
            <Text className="font-bold text-2xl text-primary">Hey <Text className="text-tertiary">{name}</Text> 👋</Text>
            <Text className="font-bold text-2xl text-primary mb-8">What's your gender?</Text>

            <FlatList 
            scrollEnabled={false}
            data={GENDERS}
            renderItem={({item, index}) => {
                return <TouchableOpacity
                className="w-32 aspect-square rounded-xl bg-white items-center justify-center mb-4 relative"
                style={{ borderColor: index === selected ? "#E29BD7" : "transparent", borderWidth: 2 }}
                onPress={() => {
                    setSelected(index)
                    setGender(GENDERS[index].gender)
                }}
                activeOpacity={0.8}
            >
                
                {selected === index && <View className="p-1 bg-tertiary rounded-full aspect-square items-center absolute top-2 right-2"><FontAwesome name="check" size={8} color="white" /></View>}
                
                <View className="rounded-full bg-primary w-16 h-16 items-center justify-center"><Ionicons name={item.icon} size={24} color="white" style={index == 2 && {marginLeft: 4}}/></View>
                <Text className="text-primary font-semibold mt-2">{item.gender}</Text>
            
            </TouchableOpacity>
            }}
            keyExtractor={(_,i) => i}
            
            />
        </View>


    )
}

export default WhatsYourGender