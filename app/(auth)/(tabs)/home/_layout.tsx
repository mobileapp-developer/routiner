import {Stack} from "expo-router";
import {palette} from "@/constants/palette";

export default function HomeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: palette.primary.white,
                },
                headerTintColor: palette.primary.black[100],
                headerShadowVisible: false,
                headerBackTitle: 'back',
            }}
        >
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name='all-habits'
                options={{
                    title: 'All Habits',
                    headerShown: true,
                }}
            />
        </Stack>
    )
}