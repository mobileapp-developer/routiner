import {Learning} from "@/constants/types";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import {palette} from "@/constants/palette";

export function LearningCard({item}: { item: Learning }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable style={styles.learningCard} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Image
                    style={styles.learningImage}
                    source={item.image}
                    resizeMode="cover"
                />
                <View style={styles.learningFooter}>
                    <View style={styles.learningBadge}>
                        <Feather name="book-open" size={11} color="#fff"/>
                    </View>
                    <Text style={styles.learningTitle}>{item.title}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    learningCard: {
        width: 200,
        height: 160,
        borderRadius: 18,
        overflow: "hidden",
        marginRight: 14,
    },
    learningImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    learningFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        gap: 6,
        backgroundColor: palette.primary.blue[100],
    },
    learningBadge: {
        width: 20,
        height: 20,
        borderRadius: 5,
        backgroundColor: "rgba(255,255,255,0.25)",
        alignItems: "center",
        justifyContent: "center",
    },
    learningTitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#fff",
    },
});