import { View, Text, TextInput } from 'react-native'
import React from 'react'

const WhatsYourName = ({name,setName}) => {
  return (
    <View className="w-full items-center px-8">
      <Text className="font-bold text-2xl text-primary">What's your name?</Text>
      <TextInput 
        className="bg-white w-full rounded-xl border border-tertiary p-4 mt-8"
        value={name}
        onChangeText = {text => setName(text)}
      />
    </View>
  )
}

export default WhatsYourName
