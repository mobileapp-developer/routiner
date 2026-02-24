import React from 'react'
import {Animated, Pressable, StyleSheet} from 'react-native'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import {palette} from '@/constants/palette'
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {useRouter} from "expo-router";

type TabItemProps = {
    route: any
    isFocused: boolean
    options: any
    onPress: () => void
}

function TabItem({isFocused, options, onPress}: TabItemProps) {
    const {scaleValue, onPressOut, onPressIn} = usePressAnimation();

    const iconColor = isFocused ? palette.primary.blue[100] : palette.primary.black[40]

    return (
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.tabItem}
        >
            <Animated.View
                style={{
                    transform: [{scale: scaleValue}],
                }}
            >
                {options.tabBarIcon?.({
                    focused: isFocused,
                    color: iconColor,
                    size: 26,
                })}
            </Animated.View>
        </Pressable>
    )
}

export default function MyTabBar({
                                     state,
                                     descriptors,
                                     navigation,
                                 }: BottomTabBarProps) {
    const router = useRouter();
    return (
        <Animated.View style={styles.container}>
            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key]
                const isFocused = state.index === index

                const onPress = () => {
                    if (route.name === 'new') {
                        router.push('/(auth)/(modal)/add')
                        return;
                    }

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params)
                    }
                }

                return (
                    <TabItem
                        key={route.key}
                        route={route}
                        isFocused={isFocused}
                        options={options}
                        onPress={onPress}
                    />
                )
            })}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 30,
        left: 24,
        right: 24,
        height: 70,
        backgroundColor: '#ffffff',
        borderWidth: 0.5,
        borderColor: palette.primary.black[20],
        borderRadius: 70,
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
})