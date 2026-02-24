import {Stack} from "expo-router";

export default function ModalLayout() {
    return (
        <Stack>
            <Stack.Screen name="add"
                          options={{
                              headerShown: false,
                              presentation: 'transparentModal',
                              animation: 'fade',
                              contentStyle: {backgroundColor: 'transparent'},
                          }}
            />
        </Stack>
    )
}