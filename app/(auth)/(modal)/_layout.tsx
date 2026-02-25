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
            <Stack.Screen name="add-habit"
                          options={{
                              headerShown: false,
                              presentation: 'formSheet',
                              sheetCornerRadius: 32,
                              sheetAllowedDetents: [0.4],
                              sheetGrabberVisible: true,
                              title: '',
                              animation: 'fade',
                          }}
            />
        </Stack>
    )
}