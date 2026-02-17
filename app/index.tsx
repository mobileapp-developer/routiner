import { Redirect } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function RootIndex() {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) return null;

    if (isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(auth)" />;
    }

    return <Redirect href="/(public)" />;
}
