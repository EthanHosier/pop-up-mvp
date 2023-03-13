import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CreateAccountUsernamePassword from "../screens/auth/CreateAccountUsernamePassword";
import LoginOptions from "../screens/auth/LoginOptions";
import LoginUsernamePassword from "../screens/auth/LoginUsernamePassword";
import Welcome from "../screens/auth/Welcome";
import Home from "../screens/main/Home";

const Stack = createNativeStackNavigator();

const HomeStack = () => {

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                animationEnabled:false
            }}
            initialRouteName="Welcome"
        
        >
            <Stack.Screen 
                name="Home"
                component={Home}
            />
        </Stack.Navigator>
    )
}

export default HomeStack