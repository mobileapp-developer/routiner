import {Challenge} from "@/constants/types";
import {usePressAnimation} from "@/hooks/usePressAnimation";
import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {palette} from "@/constants/palette";
import React from "react";

export function ChallengeCard({item}: { item: Challenge }) {
    const {scaleValue, onPressIn, onPressOut} = usePressAnimation();
    return (
        <Animated.View style={{transform: [{scale: scaleValue}]}}>
            <Pressable
                style={styles.challengeCard}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <Ionicons
                    name='time-outline'
                    size={22}
                    color={palette.primary.white}
                    style={{marginBottom: 4}}
                />
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <Text style={styles.challengeTimeLeft}>{item.timeLeft}</Text>

                <View style={styles.challengeProgressBg}>
                    <View style={styles.challengeProgressFill}/>
                </View>

                <View style={styles.challengeFriendsRow}>
                    <View style={styles.challengeAvatarStack}>
                        {Array.from({length: Math.min(item.friendsJoined, 2)}).map(
                            (_, i) => (
                                <View
                                    key={`avatar-${i}`}
                                    style={[styles.challengeAvatar, {left: i * 16}]}
                                />
                            ),
                        )}
                    </View>
                    <Text style={styles.challengeFriendsText}>
                        {item.friendsJoined} friend{item.friendsJoined !== 1 ? "s" : ""}{" "}
                        joined
                    </Text>
                </View>
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    challengeCard: {
        width: 185,
        backgroundColor: palette.primary.blue[100],
        borderRadius: 20,
        padding: 16,
        marginRight: 14,
        gap: 4,
    },
    challengeTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#fff",
    },
    challengeTimeLeft: {
        fontSize: 11,
        color: "rgba(255,255,255,0.75)",
    },
    challengeProgressBg: {
        height: 5,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.3)",
        marginVertical: 8,
    },
    challengeProgressFill: {
        width: "55%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    challengeFriendsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 2,
    },
    challengeAvatarStack: {
        flexDirection: "row",
        position: "relative",
        width: 36,
        height: 24,
    },
    challengeAvatar: {
        position: "absolute",
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: palette.primary.blue[40],
        borderWidth: 2,
        borderColor: palette.primary.blue[100],
    },
    challengeFriendsText: {
        fontSize: 12,
        color: "rgba(255,255,255,0.9)",
    },
});