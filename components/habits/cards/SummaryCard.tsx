import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {usePalette} from "@/hooks/usePalette";

type Props = {
    completed: number;
    skipped: number;
    failed: number;
    successRate: number;
    streak: number;
}

export function SummaryCard({completed, skipped, failed, successRate, streak}: Props) {
    const palette = usePalette();

    return (
        <View style={[styles.card, {backgroundColor: palette.primary.white, shadowColor: palette.primary.black[100]}]}>
            <View style={styles.cardHeader}>
                <View style={[styles.cardIconWrap, {backgroundColor: palette.primary.black[10]}]}>
                    <Text style={styles.cardIconEmoji}>👀</Text>
                </View>
                <View>
                    <Text style={[styles.cardTitle, {color: palette.primary.black[80]}]}>All Habits</Text>
                    <Text style={[styles.cardSubtitle, {color: palette.primary.black[40]}]}>Summary</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <Text style={[styles.statLabel, {color: palette.primary.black[40]}]}>SUCCESS RATE</Text>
                    <Text style={[styles.statValue, {color: palette.primary.green[100]}]}>{successRate}%</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statLabel, {color: palette.primary.black[40]}]}>COMPLETED</Text>
                    <Text style={[styles.statValue, {color: palette.primary.black[100]}]}>{completed}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statLabel, {color: palette.primary.black[40]}]}>BEST STREAK</Text>
                    <Text style={[styles.statValue, {color: palette.primary.black[100]}]}>{streak}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statLabel, {color: palette.primary.black[40]}]}>SKIPPED</Text>
                    <Text style={[styles.statValue, {color: palette.primary.black[100]}]}>{skipped}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statLabel, {color: palette.primary.black[40]}]}>FAILED</Text>
                    <Text
                        style={[styles.statValue, {color: palette.primary.black[100]}, failed > 0 && {color: palette.primary.redError[100]}]}>{failed}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 16,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 2},
        elevation: 2,
        gap: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    cardIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIconEmoji: {
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 12,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    statItem: {
        width: '45%',
        gap: 2,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: 22,
        fontWeight: '700',
    },
})