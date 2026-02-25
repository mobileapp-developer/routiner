import React from 'react';
import {Link} from "expo-router";
import {useUser} from "@clerk/clerk-expo";
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {palette} from "@/constants/palette";
import {useHabits} from "@/hooks/useHabits";
import IconButton from "@/components/ui/IconButton";
import MoodIcon from "@/components/habits/MoodIcon";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import HabitCard from "@/components/habits/HabitCard";
import HorizontalCalendar from "@/components/shared/Calendar";
import DailyGoalBanner from "@/components/habits/DailyGoalBanner";
import {deleteHabit} from "@/db/habit";

const Home = () => {
    const {user} = useUser();
    const {dbUserId} = useCurrentUser();
    const {habits, loading, refetch} = useHabits(dbUserId!);

    const handleDelete = async (habitId: number) => {
        await deleteHabit(habitId);
        refetch();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconButtonsContainer}>
                    <IconButton icon={require('../../../assets/icons/calendar.png')}
                                onPress={() => console.log('pressed')}
                    />
                    <IconButton icon={require('../../../assets/icons/notification.png')}
                                onPress={() => console.log('pressed')}
                    />
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
                <HorizontalCalendar daysCount={10}/>
            </View>

            <View style={styles.dailyProgress}>
                <DailyGoalBanner/>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habits</Text>

                <Link href={"/(auth)/(tabs)/search"}>
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
                    />
                )}
                style={styles.habitsList}
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
    empty: {
        textAlign: 'center',
        marginTop: 32,
        color: palette.primary.black[40],
    }
});

export default Home;
