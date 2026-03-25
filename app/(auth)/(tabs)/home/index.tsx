import React, {useState} from 'react';
import {Link, useRouter} from "expo-router";
import {useUser} from "@clerk/clerk-expo";
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {palette} from "@/constants/palette";
import {useHabits} from "@/hooks/useHabits";
import MoodIcon from "@/components/habits/MoodIcon";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import HabitCard from "@/components/habits/cards/HabitCard";
import HorizontalCalendar from "@/components/shared/Calendar";
import DailyGoalBanner from "@/components/habits/DailyGoalBanner";
import {deleteHabit} from "@/db/habit";
import {logHabit} from "@/db/habit_logs";
import {useQueryClient} from "@tanstack/react-query";
import {DAILY_GOALS_QUERY_KEY} from "@/hooks/useDailyGoal";
import {awardPoints, deductPoints} from "@/db/points";
import {TOTAL_POINTS_QUERY_KEY} from "@/hooks/useTotalPoints";

export default function Home(){
    const router = useRouter();
    const {user} = useUser();
    const {dbUserId} = useCurrentUser();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const {habits, loading, refetch} = useHabits(dbUserId!, selectedDate);

    const queryClient = useQueryClient()

    const handleDelete = async (habitId: number) => {
        await deleteHabit(habitId);

        await queryClient.invalidateQueries({
            queryKey: DAILY_GOALS_QUERY_KEY
        })
        await refetch();
    };

    const handleDone = async (habitId: number, goalValue: number, currentValue: number) => {
        const remaining = Math.max(goalValue - currentValue, 0)
        await logHabit(habitId, 'done', remaining, selectedDate.toISOString().split('T')[0]);

        await awardPoints(dbUserId!, habitId);

        await queryClient.invalidateQueries({
            queryKey: DAILY_GOALS_QUERY_KEY
        });
        await queryClient.invalidateQueries({
            queryKey: [...TOTAL_POINTS_QUERY_KEY, dbUserId]
        });
        await refetch();
    };

    const handleFail = async (habitId: number) => {
        await logHabit(habitId, 'fail', 0, selectedDate.toISOString().split('T')[0]);

        await deductPoints(dbUserId!, habitId);

        await queryClient.invalidateQueries({
            queryKey: DAILY_GOALS_QUERY_KEY
        })

        await queryClient.invalidateQueries({
            queryKey: [...TOTAL_POINTS_QUERY_KEY, dbUserId]
        })

        await refetch();
    };

    const handleSkip = async (habitId: number) => {
        await logHabit(habitId, 'skip', 0, selectedDate.toISOString().split('T')[0]);
        await refetch();
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconButtonsContainer}>

                </View>

                {/* Text section */}
                <View style={styles.greeting}>
                    <View style={styles.content}>
                        <Text style={styles.mainText}>Hi, {user?.firstName} 👋🏻</Text>
                        <Text style={styles.subText}>Let's make habit together</Text>
                    </View>

                    <View style={styles.moodIcon}>
                        <MoodIcon size={60} initialIndex={1}/>
                    </View>
                </View>
            </View>

            {/* Calendar */}
            <View>
                <HorizontalCalendar onDaySelect={(date) => setSelectedDate(date)}/>
            </View>

            <View style={styles.dailyProgress}>
                <DailyGoalBanner/>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    {selectedDate.toDateString() === new Date().toDateString()
                        ? 'Today\'s Habits'
                        : selectedDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                </Text>

                <Link href={"/home/all-habits"}>
                    <Text style={styles.sectionLink}>VIEW ALL</Text>
                </Link>
            </View>

            <FlatList
                data={habits}
                keyExtractor={(item) => item.habit.id.toString()}
                renderItem={({item}) => (
                    <HabitCard
                        habit={item.habit}
                        currentValue={item.currentValue}
                        onPress={() => console.log('pressed')}
                        onDelete={() => handleDelete(item.habit.id)}
                        onDone={() => handleDone(item.habit.id, item.habit.goalValue ?? 1, item.currentValue)}
                        onSkip={() => handleSkip(item.habit.id)}
                        onFail={() => handleFail(item.habit.id)}
                        onLogPress={() => router.push({
                            pathname: '/(auth)/(modal)/log-habit',
                            params: {
                                habitId: item.habit.id,
                                habitName: item.habit.name,
                                goalUnit: item.habit.goalUnit ?? '',
                                goalValue: item.habit.goalValue ?? 1,
                                currentValue: item.currentValue,
                            }
                        })}
                    />
                )}
                style={styles.habitsList}
                contentContainerStyle={styles.habitsListContent}
                ListEmptyComponent={
                    !loading ? <Text style={styles.empty}>You don't have any habits yet! Add one now!</Text> : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.blue[10],
    },
    content: {
        paddingVertical: 16,
        flex: 2
    },
    header: {
        backgroundColor: palette.primary.white,
        paddingHorizontal: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: palette.primary.black[10],
    },
    iconButtonsContainer: {
        marginTop: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    greeting: {
        flexDirection: 'row',
    },
    mainText: {
        fontSize: 26,
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0,
        paddingVertical: 10
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        color: palette.primary.black[40],
    },
    moodIcon: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    dailyProgress: {
        marginHorizontal: 18,
        marginTop: 4,
    },
    section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: palette.primary.black[100],
    },
    sectionLink: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 16,
        letterSpacing: 0,
        color: palette.primary.blue[100],
    },
    habitsList: {
        paddingHorizontal: 16,
    },
    habitsListContent: {
        paddingBottom: 100,
    },
    empty: {
        textAlign: 'center',
        marginTop: 32,
        color: palette.primary.black[40],
    }
});