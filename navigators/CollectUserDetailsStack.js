import { createNativeStackNavigator } from "@react-navigation/native-stack"
import UserDetails from "../screens/collectUserDetails/UserDetails";

const Stack = createNativeStackNavigator();

const CollectUserDetailsStack = () => {

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                animationEnabled:false
            }}
            initialRouteName="UserDetails"
        
        >
            <Stack.Screen 
                name="UserDetails"
                component={UserDetails}
            />
        </Stack.Navigator>
    )
}

export default CollectUserDetailsStack