import React from "react";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View} from "react-native";
import {usePalette} from "@/hooks/usePalette";

type Props = {
    title: string,
    subtitle: string,
    icon: ImageSourcePropType,
    onPress: () => void,
}

export default function AddModalCard({title, subtitle, icon, onPress}: Props) {
    const {scaleValue, onPressOut, onPressIn} = usePressAnimation();
    const palette = usePalette();

    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={[styles.card, {backgroundColor: palette.primary.white, borderColor: palette.primary.white}]}
                onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
                <View style={styles.text}>
                    <Text style={[styles.title, {color: palette.primary.black[100]}]}>{title}</Text>
                    <Text style={[styles.subtitle, {color: palette.primary.black[40]}]}>{subtitle}</Text>
                </View>

                <Image source={icon} style={styles.icon}/>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
    },
    text: {
        gap: 4
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 13,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});