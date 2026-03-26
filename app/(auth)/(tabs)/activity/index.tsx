import React, {useState} from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View,} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {Ionicons} from '@expo/vector-icons';
import {palette} from '@/constants/palette';
import {useCurrentUser} from '@/hooks/useCurrentUser';
import {useBestStreak, useHabitsLineData, useHabitsSummary} from '@/hooks/useHabitStats';
import {SummaryCard} from "@/components/habits/cards/SummaryCard";
import {MoodCard} from "@/components/habits/cards/MoodCard";

type Period = 'daily' | 'weekly' | 'monthly';

function getWeekRange(offset = 0) {
    const now = new Date();
    const day = now.getDay() === 0 ? 6 : now.getDay() - 1; // Mon=0
    const mon = new Date(now);

    mon.setDate(now.getDate() - day + offset * 7);

    const sun = new Date(mon);

    sun.setDate(mon.getDate() + 6);

    return {
        from: mon.toISOString().split('T')[0],
        to: sun.toISOString().split('T')[0],
        label: `${mon.toLocaleDateString('en', {
            month: 'short',
            day: 'numeric'
        })} – ${sun.toLocaleDateString('en', {month: 'short', day: 'numeric'})}`,
    };
}

function getDayRange(offset = 0) {
    const d = new Date();

    d.setDate(d.getDate() + offset);

    const s = d.toISOString().split('T')[0];

    return {
        from: s,
        to: s,
        label: d.toLocaleDateString('en', {
                weekday: 'long',
                month: 'short',
                day: 'numeric'
            }
        )
    };
}

function getMonthRange(offset = 0) {
    const d = new Date();
    d.setMonth(d.getMonth() + offset);

    const from = new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];

    const to = new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().split('T')[0];

    return {from, to, label: d.toLocaleDateString('en', {month: 'long', year: 'numeric'})};
}

export default function Index() {
    const {width} = useWindowDimensions();
    const chartWidth = width - 80;

    const {dbUserId} = useCurrentUser();
    const userId = dbUserId ?? 0;

    const [period, setPeriod] = useState<Period>('weekly');
    const [offset, setOffset] = useState(0);

    const range = period === 'daily' ? getDayRange(offset)
        : period === 'monthly' ? getMonthRange(offset)
            : getWeekRange(offset);

    const summary = useHabitsSummary(userId, range.from, range.to);
    const lineQuery = useHabitsLineData(userId, range.from, range.to);
    const streakQ = useBestStreak(userId);

    const days = Math.round((new Date(range.to).getTime() - new Date(range.from).getTime()) / 86400000) + 1;

    const lineData = Array.from({length: days}, (_, i) => {
        const d = new Date(range.from);

        d.setDate(d.getDate() + i);

        const dateStr = d.toISOString().split('T')[0];

        const found = lineQuery.data?.find(r => r.date === dateStr);

        return {
            value: found ? Number(found.count) : 0,
            label: d.toLocaleDateString('en', {weekday: 'narrow'}),
        };
    });

    const isLoading = summary.isLoading || lineQuery.isLoading || streakQ.isLoading;

    const PERIODS: { key: Period; label: string }[] = [
        {key: 'daily', label: 'Daily'},
        {key: 'weekly', label: 'Weekly'},
        {key: 'monthly', label: 'Monthly'},
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.screenTitle}>Activity</Text>
                <View style={styles.segmented}>
                    {PERIODS.map(p => (
                        <Pressable
                            key={p.key}
                            style={[styles.segmentBtn, period === p.key && styles.segmentBtnActive]}
                            onPress={() => {
                                setPeriod(p.key);
                                setOffset(0);
                            }}
                        >
                            <Text style={[styles.segmentText, period === p.key && styles.segmentTextActive]}>
                                {p.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                <View style={styles.dateNav}>
                    <View>
                        <Text style={styles.dateNavTitle}>
                            {period === 'weekly' ? 'This week' : period === 'monthly' ? 'This month' : 'Today'}
                        </Text>
                        <Text style={styles.dateNavSub}>{range.label}</Text>
                    </View>
                    <View style={styles.dateNavBtns}>
                        <Pressable style={styles.dateNavBtn} onPress={() => setOffset(o => o - 1)}>
                            <Ionicons name="chevron-back" size={18} color={palette.primary.black[60]}/>
                        </Pressable>
                        <Pressable
                            style={[styles.dateNavBtn, offset === 0 && styles.dateNavBtnDisabled]}
                            onPress={() => setOffset(o => Math.min(0, o + 1))}
                            disabled={offset === 0}
                        >
                            <Ionicons name="chevron-forward" size={18} color={offset === 0
                                ? palette.primary.black[20]
                                : palette.primary.black[60]}/>
                        </Pressable>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {isLoading ? (
                    <ActivityIndicator color={palette.primary.blue[100]} style={{marginTop: 40}}/>
                ) : (
                    <>
                        <SummaryCard
                            completed={summary.data?.completed ?? 0}
                            skipped={summary.data?.skipped ?? 0}
                            failed={summary.data?.failed ?? 0}
                            successRate={summary.data?.successRate ?? 0}
                            streak={streakQ.data ?? 0}
                        />

                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <View style={styles.cardIconWrap}>
                                    <Text style={styles.cardIconEmoji}>📈</Text>
                                </View>
                                <View>
                                    <Text style={styles.cardTitle}>Habits</Text>
                                    <Text style={styles.cardSubtitle}>Completions by day</Text>
                                </View>
                            </View>

                            {lineData.some(d => d.value > 0) ? (
                                <View style={{overflow: 'hidden', borderRadius: 12}}>
                                    <LineChart
                                        data={lineData}
                                        height={160}
                                        width={chartWidth}
                                        color={palette.primary.blue[100]}
                                        thickness={2.5}
                                        startFillColor={palette.primary.blue[20]}
                                        endFillColor={palette.primary.blue[80]}
                                        areaChart
                                        curved
                                        hideDataPoints={false}
                                        dataPointsColor={palette.primary.blue[100]}
                                        dataPointsRadius={4}
                                        xAxisColor={palette.primary.black[20]}
                                        yAxisColor={palette.primary.black[20]}
                                        yAxisTextStyle={styles.axisText}
                                        xAxisLabelTextStyle={styles.axisText}
                                        noOfSections={3}
                                        rulesColor={palette.primary.black[10]}
                                        rulesType="solid"
                                        initialSpacing={8}
                                    />
                                </View>
                            ) : (
                                <Text style={styles.empty}>No data for this period</Text>
                            )}
                        </View>
                    </>
                )}
                <MoodCard from={range.from} to={range.to} days={days}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.black[10],
    },
    header: {
        backgroundColor: palette.primary.white,
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: palette.primary.black[10],
        gap: 12,
    },
    content: {
        padding: 20,
        paddingBottom: 120,
        gap: 12,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: palette.primary.black[100],
        marginBottom: 4,
    },
    segmented: {
        flexDirection: 'row',
        backgroundColor: palette.primary.black[10],
        borderRadius: 12,
        padding: 4,
        gap: 4,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 10,
        alignItems: 'center',
    },
    segmentBtnActive: {
        backgroundColor: palette.primary.white,
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '500',
        color: palette.primary.black[40],
    },
    segmentTextActive: {
        color: palette.primary.blue[100],
        fontWeight: '600',
    },
    dateNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateNavTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: palette.primary.black[80],
    },
    dateNavSub: {
        fontSize: 12,
        color: palette.primary.black[40],
        marginTop: 1,
    },
    dateNavBtns: {
        flexDirection: 'row',
        gap: 8,
    },
    dateNavBtn: {
        width: 42,
        height: 42,
        borderRadius: 16,
        backgroundColor: palette.primary.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: palette.primary.black[10],
        borderWidth: 1,
    },
    dateNavBtnDisabled: {
        opacity: 0.4,
    },
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
    axisText: {
        fontSize: 10,
        color: palette.primary.black[40],
    },
    empty: {
        textAlign: 'center',
        color: palette.primary.black[40],
        fontSize: 13,
        paddingVertical: 24,
    },
});