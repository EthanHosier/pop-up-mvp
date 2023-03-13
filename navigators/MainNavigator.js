import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screen } from "react-native-screens";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {

    const {user} = useAuth();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
            initialRouteName="AuthStack"
        >
            {
                !user ?
                    <Stack.Screen
                        name="AuthStack"
                        component={AuthStack}
                    />
                    :
                    <Stack.Screen
                        name="HomeStack"
                        component={HomeStack}
                    />
            }

        </Stack.Navigator>
    )
}

export default MainNavigator