import {HabitClub} from "@/constants/types";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import React from "react";
import {palette} from "@/constants/palette";

export function ClubCard({club}: { club: HabitClub }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.clubCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View style={styles.clubIconBox}>
                    <Text style={styles.clubEmoji}>{club.emoji}</Text>
                </View>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubMembers}>{club.members}</Text>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    clubCard: {
        width: 130,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: palette.primary.black[10],
        backgroundColor: palette.primary.white,
        padding: 14,
        marginRight: 12,
        gap: 6,
    },
    clubIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: palette.primary.blue[10],
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    clubEmoji: {
        fontSize: 24,
    },
    clubName: {
        fontSize: 14,
        fontWeight: "700",
        color: palette.primary.black[100],
    },
    clubMembers: {
        fontSize: 12,
        color: palette.primary.black[40],
    },
});