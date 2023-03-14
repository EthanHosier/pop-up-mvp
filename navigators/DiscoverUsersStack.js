import { Dimensions } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Story from '../screens/main/Story';
import DiscoverUsers from '../screens/main/DisoverUsers';
import { Easing } from 'react-native-reanimated';

const Stack = createSharedElementStackNavigator();

const screenHeight = Dimensions.get('screen').height;
const DiscoverUsersStack = () => {


    const transitionSpec = {
        open: {
            animation: 'timing',
            config: {
                duration: 300, // Decrease the duration here
                easing: Easing.out(Easing.exp),
            },
        },
        close: {
            animation: 'timing',
            config: {
                duration: 150, // Decrease the duration here
                easing: Easing.out(Easing.exp),
            },
        },
    };

    return (
            <Stack.Navigator
                initialRouteName="DiscoverUsers"
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: false,


                    cardOverlayEnabled: false,
                    cardStyle: { backgroundColor: "transparent" },
                    transitionSpec,
                    
                }}
                
            >
                <Stack.Screen name="DiscoverUsers" component={DiscoverUsers} />

                <Stack.Screen
                    name="Story"
                    component={Story}
                    sharedElements={(route) => {
                        return [
                            {
                                id: `item.${route.params.id}`,
                                align: 'auto',
                                resize: 'auto',
                                align: 'auto',
                            },
                            {
                                id: `details.${route.params.id}`,
                                align: 'auto',
                                resize: 'auto',
                                align: 'auto',
                            },
                        ];
                    }}
                    options={{
                        animationEnabled: true,
                        gestureDirection: "vertical",
                        presentation:"transparentModal"
                    }}

                />


            </Stack.Navigator>
    );
}

export default DiscoverUsersStack