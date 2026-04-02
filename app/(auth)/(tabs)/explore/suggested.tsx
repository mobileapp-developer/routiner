import React from "react";
import {Alert, FlatList, StyleSheet, View} from "react-native";
import {HABITS, POPULAR_HABITS} from "@/constants/habits";
import {PopularHabitCard} from "@/components/habits/cards/PopularHabitCard";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
import {DAILY_GOALS_QUERY_KEY} from "@/hooks/useDailyGoal";
import {useQueryClient} from "@tanstack/react-query";
import {HABITS_QUERY_KEY} from "@/hooks/useHabits";
import {usePalette} from "@/hooks/usePalette";

const SuggestedScreen = () => {
    const queryClient = useQueryClient();
    const {dbUserId} = useCurrentUser();
    const palette = usePalette();

    const handleAddPopular = async (item: typeof POPULAR_HABITS[0]) => {
        if (!dbUserId) return;
        await createHabit({
            userId: dbUserId,
            name: item.name,
            icon: item.emoji,
            color: item.color,
            type: 'count',
            goalValue: item.goalValue,
            goalUnit: item.goalUnit,
            frequencyType: 'daily',
            points: item.points,
        });
        await queryClient.invalidateQueries({
            queryKey: DAILY_GOALS_QUERY_KEY
        });
        await queryClient.invalidateQueries({
            queryKey: HABITS_QUERY_KEY
        });
        Alert.alert('Habit added successfully!');
    };

    return (
        <View style={[styles.container, {backgroundColor: palette.primary.black[10]}]}>
            <FlatList
                data={HABITS}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.list}
                columnWrapperStyle={styles.row}
                renderItem={({item}) => (
                    <PopularHabitCard
                        onPress={() => handleAddPopular(item)}
                        item={item}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        paddingBottom: 120,
    },
    row: {
        justifyContent: 'space-evenly',
    },
});

export default SuggestedScreen;