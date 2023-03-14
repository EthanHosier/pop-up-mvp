import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DiscoverUsersStack from "./DiscoverUsersStack"

const Stack = createNativeStackNavigator();

const HomeStack = () => {

    return(
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                animationEnabled:false
            }}
            initialRouteName="DiscoverUsersStack"
        
        >
            <Stack.Screen 
                name="DiscoverUsersStack"
                component={DiscoverUsersStack}
            />
        </Stack.Navigator>
    )
}

export default HomeStack