import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './navigators/MainNavigator'
import { AuthProvider } from './context/AuthProvider'
import { FirestoreProvider } from './context/FirestoreProvider'

const App = () => {
    return (
        <NavigationContainer>
            <FirestoreProvider>
                <AuthProvider>
                    <MainNavigator />
                </AuthProvider>
            </FirestoreProvider>
        </NavigationContainer>
    )
}

export default App