import {Learning} from "@/constants/types";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";
import React from "react";
import {palette} from "@/constants/palette";

export function LearningCard({item}: { item: Learning }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.learningCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View
                    style={[styles.learningImage, {backgroundColor: item.bgColor}]}
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
        width: 185,
        height: 155,
        borderRadius: 18,
        overflow: "hidden",
        marginRight: 14,
        backgroundColor: palette.primary.black[20],
    },
    learningImage: {
        flex: 1,
    },
    learningFooter: {
        backgroundColor: palette.primary.blue[100],
        padding: 12,
        gap: 6,
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