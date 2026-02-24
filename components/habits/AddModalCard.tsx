import React from "react";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, View} from "react-native";
import {palette} from "@/constants/palette";

type Props = {
    title: string,
    subtitle: string,
    icon: ImageSourcePropType,
    onPress: () => void,
}

export default function AddModalCard({title, subtitle, icon, onPress}: Props) {
    const {scaleValue, onPressOut, onPressIn} = usePressAnimation();

    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.card}
                onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
                <View style={styles.text}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
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
        backgroundColor: palette.primary.white,
        borderColor: palette.primary.white,
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
        color: palette.primary.black[100],
    },
    subtitle: {
        fontSize: 13,
        color: palette.primary.black[40],
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});