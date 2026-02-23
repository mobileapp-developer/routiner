import {Stack} from 'expo-router';

export default function RegisterLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="gender" options={{headerShown: false}}/>
            <Stack.Screen name="habit" options={{headerShown: false}}/>
        </Stack>
    );
}
