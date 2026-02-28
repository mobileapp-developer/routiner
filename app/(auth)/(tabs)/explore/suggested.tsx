import React from "react";
import {Alert, FlatList, StyleSheet, View} from "react-native";
import {palette} from "@/constants/palette";
import {POPULAR_HABITS} from "@/constants/popularHabits";
import {PopularHabitCard} from "@/components/habits/cards/PopularHabitCard";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
import {HABITS} from "@/constants/habits";

const ALL_HABITS = [...POPULAR_HABITS, ...HABITS];


const SuggestedScreen = () => {
    const {dbUserId} = useCurrentUser();

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
        });
        Alert.alert('Habit added successfully!');
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={ALL_HABITS}
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
        backgroundColor: palette.primary.white,
    },
    list: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    row: {
        justifyContent: 'space-evenly',
    },
});

export default SuggestedScreen;