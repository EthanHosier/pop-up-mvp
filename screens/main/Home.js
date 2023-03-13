import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const {signout} = useAuth();
  return (
    <View className="flex-1 items-center justify-center">
      <TouchableOpacity
        onPress={signout}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home