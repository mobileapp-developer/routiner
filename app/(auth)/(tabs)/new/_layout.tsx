import {Stack} from "expo-router";
import {lightPalette} from "@/constants/palette";

export default function NewLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: lightPalette.primary.white,
                },
                headerTintColor: lightPalette.primary.black[100],
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    )
}