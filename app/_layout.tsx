import {Stack} from 'expo-router';
import {ClerkProvider} from "@clerk/clerk-expo";
import {StatusBar} from "expo-status-bar";
import {tokenCache} from "@clerk/clerk-expo/token-cache";
import {useDatabaseMigrations} from "@/db/migrations";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function RootLayout() {
    const {success, error} = useDatabaseMigrations();

    if (error) {
        return (
            <View style={styles.error}>
                <Text>Помилка бази даних: {error.message}</Text>
            </View>
        );
    }

    if (!success) {
        return (
            <View style={styles.success}>
                <ActivityIndicator size="large"/>
            </View>
        );
    }

    return (
        <GestureHandlerRootView>
            <QueryClientProvider client={queryClient}>
                <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
                    <Stack screenOptions={{headerShown: false}}>
                        <Stack.Screen name="index"/>
                        <Stack.Screen name="(public)"/>
                        <Stack.Screen name="(auth)"/>
                    </Stack>
                    <StatusBar style="dark"/>
                </ClerkProvider>
            </QueryClientProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    success: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});