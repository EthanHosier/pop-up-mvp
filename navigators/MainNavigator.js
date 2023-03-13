import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Screen } from "react-native-screens";
import AuthStack from "./AuthStack";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                gestureEnabled:false,
            }}
            initialRouteName="AuthStack"
        >
            <Stack.Screen 
                name="AuthStack"
                component={AuthStack}
            />
        </Stack.Navigator>
    )
}

export default MainNavigator