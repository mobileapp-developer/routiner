import {Stack} from "expo-router";
import {palette} from "@/constants/palette";

export default function ExploreLayout() {
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
            <Stack.Screen name="index"
                          options={{
                              headerShown: false,
                          }}
            />
            <Stack.Screen name="suggested"
                          options={{
                              title: "Suggested for You",
                              headerTitleStyle: {
                                  fontSize: 20,
                                  fontWeight: "700",
                              },
                              headerBackTitle: 'back',
                              animation: 'slide_from_right'
                          }}
            />
            <Stack.Screen name="learning"
                          options={{
                              title: "Learning",
                              headerTitleStyle: {
                                  fontSize: 20,
                                  fontWeight: "700",
                              },
                              headerBackTitle: 'back',
                              animation: 'slide_from_right'
                          }}
            />
        </Stack>
    );
}

