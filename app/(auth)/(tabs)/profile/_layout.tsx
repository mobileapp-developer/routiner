import {Stack} from "expo-router";
import {palette} from "@/constants/palette";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: palette.primary.white,
                },
                headerTintColor: palette.primary.black[100],
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='settings'
                options={{
                    headerShown: false,
                }}
            />

        </Stack>
    )
}