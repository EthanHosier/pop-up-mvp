import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CreateAccountUsernamePassword from "../screens/auth/CreateAccountUsernamePassword";
import LoginOptions from "../screens/auth/LoginOptions";
import LoginUsernamePassword from "../screens/auth/LoginUsernamePassword";
import Welcome from "../screens/auth/Welcome";

const Stack = createNativeStackNavigator();

const AuthStack = () => {

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                animationEnabled:false
            }}
            initialRouteName="Welcome"
        
        >
            <Stack.Screen 
                name="Welcome"
                component={Welcome}
            />

            <Stack.Screen 
                name="LoginOptions"
                component={LoginOptions}
            />

            <Stack.Screen 
                name="LoginUsernamePassword"
                component={LoginUsernamePassword}
            />

            <Stack.Screen 
                name="CreateAccountUsernamePassword"
                component={CreateAccountUsernamePassword}
            />
        </Stack.Navigator>
    )
}

export default AuthStack