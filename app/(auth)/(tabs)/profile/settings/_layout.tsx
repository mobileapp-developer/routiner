import {Stack} from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen
                name='index'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='notifications'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='general'
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='security'
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};