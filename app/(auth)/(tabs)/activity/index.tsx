import React, {useState} from 'react';
import {ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View,} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {Ionicons} from '@expo/vector-icons';
import {addDaysToDateKey, diffDateKeysInclusive, fromDateKey, toDateKey} from '@/constants/date';
import {useCurrentUser} from '@/hooks/useCurrentUser';
import {useBestStreak, useHabitsLineData, useHabitsSummary} from '@/hooks/useHabitStats';
import {SummaryCard} from "@/components/habits/cards/SummaryCard";
import {MoodCard} from "@/components/habits/cards/MoodCard";
import {usePalette} from "@/hooks/usePalette";

type Period = 'weekly' | 'monthly';

function getWeekRange(offset = 0) {
    const now = new Date();
    const day = now.getDay() === 0 ? 6 : now.getDay() - 1; // Mon=0
    const mon = new Date(now);

    mon.setDate(now.getDate() - day + offset * 7);

    const sun = new Date(mon);

    sun.setDate(mon.getDate() + 6);

    return {
        from: toDateKey(mon),
        to: toDateKey(sun),
        label: `${mon.toLocaleDateString('en', {
            month: 'short',
            day: 'numeric'
        })} – ${sun.toLocaleDateString('en', {month: 'short', day: 'numeric'})}`,
    };
}

function getMonthRange(offset = 0) {
    const d = new Date();
    d.setMonth(d.getMonth() + offset);

    const from = toDateKey(new Date(d.getFullYear(), d.getMonth(), 1));

    const to = toDateKey(new Date(d.getFullYear(), d.getMonth() + 1, 0));

    return {from, to, label: d.toLocaleDateString('en', {month: 'long', year: 'numeric'})};
}

export default function Index() {
    const {width} = useWindowDimensions();
    const chartWidth = width - 80;
    const palette = usePalette();

    const {dbUserId} = useCurrentUser();
    const userId = dbUserId ?? 0;

    const [period, setPeriod] = useState<Period>('weekly');
    const [offset, setOffset] = useState(0);

    const range = period === 'monthly'
        ? getMonthRange(offset)
        : getWeekRange(offset);

    const summary = useHabitsSummary(userId, range.from, range.to);
    const lineQuery = useHabitsLineData(userId, range.from, range.to);
    const streakQ = useBestStreak(userId);

    const days = diffDateKeysInclusive(range.from, range.to);

    const lineDataByDate = new Map((lineQuery.data ?? []).map((row) => [row.date, Number(row.count)]));

    const lineData = Array.from({length: days}, (_, i) => {
        const dateStr = addDaysToDateKey(range.from, i);
        const d = fromDateKey(dateStr);

        return {
            value: lineDataByDate.get(dateStr) ?? 0,
            label: d.toLocaleDateString('en', {weekday: 'narrow'}),
        };
    });

    const isLoading = summary.isLoading || lineQuery.isLoading || streakQ.isLoading;

    const PERIODS: { key: Period; label: string }[] = [
        {key: 'weekly', label: 'Weekly'},
        {key: 'monthly', label: 'Monthly'},
    ];

    return (
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <View style={[styles.header, {
                backgroundColor: palette.primary.white,
                borderBottomColor: palette.primary.black[10]
            }]}>
                <Text style={[styles.screenTitle, {color: palette.primary.black[100]}]}>Activity</Text>
                <View style={[styles.segmented, {backgroundColor: palette.primary.black[10]}]}>
                    {PERIODS.map(p => (
                        <Pressable
                            key={p.key}
                            style={[styles.segmentBtn, period === p.key && [styles.segmentBtnActive, {backgroundColor: palette.primary.white}]]}
                            onPress={() => {
                                setPeriod(p.key);
                                setOffset(0);
                            }}
                        >
                            <Text
                                style={[styles.segmentText, {color: palette.primary.black[40]}, period === p.key && [styles.segmentTextActive, {color: palette.primary.blue[100]}]]}>
                                {p.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
                <View style={styles.dateNav}>
                    <View>
                        <Text style={[styles.dateNavTitle, {color: palette.primary.black[80]}]}>
                            {period === 'weekly' ? 'This week' : period === 'monthly' ? 'This month' : 'Today'}
                        </Text>
                        <Text style={[styles.dateNavSub, {color: palette.primary.black[40]}]}>{range.label}</Text>
                    </View>
                    <View style={styles.dateNavBtns}>
                        <Pressable style={[styles.dateNavBtn, {
                            backgroundColor: palette.primary.white,
                            borderColor: palette.primary.black[10]
                        }]} onPress={() => setOffset(o => o - 1)}>
                            <Ionicons name="chevron-back" size={18} color={palette.primary.black[60]}/>
                        </Pressable>
                        <Pressable
                            style={[styles.dateNavBtn, {
                                backgroundColor: palette.primary.white,
                                borderColor: palette.primary.black[10]
                            }, offset === 0 && styles.dateNavBtnDisabled]}
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

                        <View style={[styles.card, {
                            backgroundColor: palette.primary.white,
                            shadowColor: palette.primary.black[100]
                        }]}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.cardIconWrap, {backgroundColor: palette.primary.black[10]}]}>
                                    <Text style={styles.cardIconEmoji}>📈</Text>
                                </View>
                                <View>
                                    <Text style={[styles.cardTitle, {color: palette.primary.black[80]}]}>Habits</Text>
                                    <Text style={[styles.cardSubtitle, {color: palette.primary.black[40]}]}>Completions
                                        by day</Text>
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
                                        yAxisTextStyle={[styles.axisText, {color: palette.primary.black[40]}]}
                                        xAxisLabelTextStyle={[styles.axisText, {color: palette.primary.black[40]}]}
                                        noOfSections={3}
                                        rulesColor={palette.primary.black[10]}
                                        rulesType="solid"
                                        initialSpacing={8}
                                    />
                                </View>
                            ) : (
                                <Text style={[styles.empty, {color: palette.primary.black[40]}]}>No data for this
                                    period</Text>
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
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 70,
        paddingBottom: 20,
        borderBottomWidth: 1.5,
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
        marginBottom: 4,
    },
    segmented: {
        flexDirection: 'row',
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
        backgroundColor: '#FFFFFF',
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '500',
    },
    segmentTextActive: {
        color: '#3843FF',
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
    },
    dateNavSub: {
        fontSize: 12,
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
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    dateNavBtnDisabled: {
        opacity: 0.4,
    },
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
    axisText: {
        fontSize: 10,
    },
    empty: {
        textAlign: 'center',
        fontSize: 13,
        paddingVertical: 24,
    },
});