import { View, Text } from 'react-native'
import React from 'react'
import Welcome from './screens/auth/Welcome'
import LoginOptions from './screens/auth/LoginOptions'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigators/MainNavigator'

const App = () => {
  return (
    <NavigationContainer>
        <MainNavigator/>
    </NavigationContainer>
  )
}

export default App