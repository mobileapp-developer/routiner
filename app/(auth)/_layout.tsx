import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return null;

    if (!isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(public)/onboarding" />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{
                headerShown: false,
            }}/>
            <Stack.Screen name="(register)" options={{
                headerShown: false,
            }}/>
        </Stack>
    );
}
