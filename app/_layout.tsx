import {Stack} from 'expo-router';
import {ClerkProvider} from "@clerk/clerk-expo";
import {StatusBar} from "expo-status-bar";
import {tokenCache} from "@clerk/clerk-expo/token-cache";

export default function RootLayout() {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="(public)"/>
                <Stack.Screen name="(auth)"/>
            </Stack>
            <StatusBar style="auto"/>
        </ClerkProvider>
    );
}