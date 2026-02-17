import {Redirect, Stack} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

export default function PublicLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return null;

    if (isSignedIn) {
        //@ts-ignore
        return <Redirect href="/(auth)" />;
    }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Index" }} />
      <Stack.Screen name="onboarding" options={{ title: "Welcome" }} />
      <Stack.Screen name="sign-in" options={{
          headerShown: false,
          title: "SignIn",

      }} />
    </Stack>
  );
}
