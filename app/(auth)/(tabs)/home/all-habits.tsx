import React, {useMemo} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from 'react-native';
import {palette} from '@/constants/palette';
import {useCurrentUser} from '@/hooks/useCurrentUser';
import {useHabits} from '@/hooks/useHabits';
import HabitItem from '@/components/habits/HabitItem';

export default function AllHabitsScreen() {
    const {dbUserId} = useCurrentUser();
    const selectedDate = useMemo(() => new Date(), []);
    const {habits, loading} = useHabits(dbUserId, selectedDate);

    if (!dbUserId || loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={palette.primary.blue[100]} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.habit.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({item}) => (
                    <HabitItem
                        name={item.habit.name}
                        emoji={item.habit.icon ?? '📌'}
                        current={item.currentValue}
                        goalValue={item.habit.goalValue ?? 1}
                        goalUnit={item.habit.goalUnit ?? (item.habit.type === 'yesno' ? 'done' : '')}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.empty}>You don't have any habits yet! Add one now!</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: palette.primary.blue[10],
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.primary.blue[10],
    },
    empty: {
        textAlign: 'center',
        marginTop: 24,
        color: palette.primary.black[40],
    },
});
