import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screen } from "react-native-screens";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useFirestore from "../hooks/useFirestore";
import CollectUserDetailsStack from "./CollectUserDetailsStack";
import UserDetails from "../screens/collectUserDetails/UserDetails";


const Stack = createNativeStackNavigator();

const MainNavigator = () => {

    const { user } = useAuth();

    const { name, gender } = useFirestore();

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
                    !name || !gender?

                    <Stack.Screen
                        name="CollectUserDetailsStack"
                        component={CollectUserDetailsStack}
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