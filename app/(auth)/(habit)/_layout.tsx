import {Stack} from "expo-router";
import {Platform} from "react-native";

export default function HabitLayout() {
    return (
        <Stack>
            <Stack.Screen name="create-habit" options={{
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'ios_from_right' : 'slide_from_right',
            }}/>
            <Stack.Screen name="quit-habit" options={{
                headerShown: false,
                animation: Platform.OS === 'ios' ? 'ios_from_left' : 'slide_from_left',
            }}/>
        </Stack>
    )
}