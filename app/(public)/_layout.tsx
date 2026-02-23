import {Stack} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

export default function PublicLayout() {
    const {isLoaded} = useAuth();

    if (!isLoaded) return null;

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index" options={{title: "Index"}}/>
            <Stack.Screen name="onboarding" options={{title: "Welcome"}}/>
            <Stack.Screen name="sign-in" options={{title: "SignIn", headerShown: false,}}/>
            <Stack.Screen name="sign-up" options={{title: "SignUp", headerShown: false,}}/>
            <Stack.Screen name="(register)" options={{title: "Register", headerShown: false,}}/>
        </Stack>
    );
}
