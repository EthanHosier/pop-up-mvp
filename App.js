import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigators/MainNavigator'
import { AuthProvider } from './context/AuthProvider'

const App = () => {
    return (
        <NavigationContainer>
            <AuthProvider>
                <MainNavigator />
            </AuthProvider>
        </NavigationContainer>
    )
}

export default App