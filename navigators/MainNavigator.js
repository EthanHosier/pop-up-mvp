import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screen } from "react-native-screens";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import CollectUserDetailsStack from "./CollectUserDetailsStack";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {

    const {user} = useAuth();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            {
                !user ?
                    <Stack.Screen
                        name="AuthStack"
                        component={AuthStack}
                    />
                    :
                    
                    <Stack.Screen
                        name="CollectUserDetailsStack"
                        component={CollectUserDetailsStack}
                    />
            }

        </Stack.Navigator>
    )
}

export default MainNavigator