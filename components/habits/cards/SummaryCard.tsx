import {StyleSheet, Text, View} from "react-native";
import {palette} from "@/constants/palette";
import React from "react";

type Props = {
    completed: number;
    skipped: number;
    failed: number;
    successRate: number;
    streak: number;
}

export function SummaryCard({completed, skipped, failed, successRate, streak}: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.cardIconWrap}>
                    <Text style={styles.cardIconEmoji}>👀</Text>
                </View>
                <View>
                    <Text style={styles.cardTitle}>All Habits</Text>
                    <Text style={styles.cardSubtitle}>Summary</Text>
                </View>
            </View>

            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>SUCCESS RATE</Text>
                    <Text style={[styles.statValue, {color: palette.primary.green[100]}]}>{successRate}%</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>COMPLETED</Text>
                    <Text style={styles.statValue}>{completed}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>BEST STREAK</Text>
                    <Text style={styles.statValue}>{streak}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>SKIPPED</Text>
                    <Text style={styles.statValue}>{skipped}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>FAILED</Text>
                    <Text
                        style={[styles.statValue, failed > 0 && {color: palette.primary.redError[100]}]}>{failed}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: palette.primary.white,
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
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
        backgroundColor: palette.primary.black[10],
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardIconEmoji: {
        fontSize: 20,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: palette.primary.black[80],
    },
    cardSubtitle: {
        fontSize: 12,
        color: palette.primary.black[40],
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
        color: palette.primary.black[40],
        letterSpacing: 0.5,
    },
    statValue: {
        fontSize: 22,
        fontWeight: '700',
        color: palette.primary.black[100],
    },
})