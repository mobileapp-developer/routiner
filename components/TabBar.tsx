import React, {useCallback, useRef} from 'react'
import {Animated, Pressable, StyleSheet} from 'react-native'
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import * as Haptics from 'expo-haptics'
import {palette} from '@/constants/palette'

type TabItemProps = {
    route: any
    isFocused: boolean
    options: any
    onPress: () => void
}

function TabItem({ isFocused, options, onPress }: TabItemProps) {
    const scaleValue = useRef(new Animated.Value(1)).current

    const onPressIn = useCallback(() => {
        Animated.spring(scaleValue, {
            toValue: 0.92,
            useNativeDriver: true,
        }).start()

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [])

    const onPressOut = useCallback(() => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start()
    }, [])

    const iconColor = isFocused
        ? palette.primary.blue[100]
        : palette.primary.black[40]

    return (
        <Pressable
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={styles.tabItem}
        >
            <Animated.View
                style={{
                    transform: [{ scale: scaleValue }],
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
    return (
        <Animated.View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key]
                const isFocused = state.index === index

                const onPress = () => {
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
        shadowOffset: { width: 0, height: 10 },
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