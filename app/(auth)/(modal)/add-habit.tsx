import {useRouter} from "expo-router";
import {Animated, FlatList, Pressable, StyleSheet, Text} from "react-native";
import {POPULAR_HABITS} from "@/constants/habits";
import {useSlideAnimation} from "@/hooks/useSlideAnimation";
import {PopularHabitCard} from '@/components/habits/cards/PopularHabitCard'
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
import {useQueryClient} from "@tanstack/react-query";
import {DAILY_GOALS_QUERY_KEY} from "@/hooks/useDailyGoal";
import {HABITS_QUERY_KEY} from "@/hooks/useHabits";
import {usePalette} from "@/hooks/usePalette";

export default function AddHabit() {
    const router = useRouter();
    const {slideValue} = useSlideAnimation();
    const {dbUserId} = useCurrentUser();
    const palette = usePalette();

    const queryClient = useQueryClient();

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
            queryKey: HABITS_QUERY_KEY,
        });

        router.dismissAll();
    }

    return (
        <Pressable style={styles.overlay} onPress={() => router.back()}>
            <Animated.View style={[styles.sheet, {backgroundColor: palette.primary.white, transform: [{translateY: slideValue}]}]}>
                <Pressable onPress={(e) => e.stopPropagation()} style={styles.content}>

                    <Text style={[styles.label, {color: palette.primary.black[40]}]}>NEW GOOD HABIT</Text>

                    <Pressable style={[styles.customButton, {borderColor: palette.primary.black[10]}]} onPress={() => router.push('/(auth)/(habit)/create-habit')}>
                        <Text style={[styles.customText, {color: palette.primary.black[100]}]}>Create Custom Habit</Text>
                        <Animated.View style={[styles.addButton, {borderColor: palette.primary.black[10], backgroundColor: palette.primary.white}]}>
                            <Text style={[styles.plus, {color: palette.primary.black[60]}]}>+</Text>
                        </Animated.View>
                    </Pressable>

                    <Text style={[styles.label, {color: palette.primary.black[40]}]}>POPULAR HABITS</Text>

                    <FlatList
                        data={POPULAR_HABITS}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.row}
                        renderItem={({item}) => (
                            <PopularHabitCard
                                onPress={() => handleAddPopular(item)}
                                item={item}/>
                        )}
                    />
                </Pressable>
            </Animated.View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    overlay: {
        justifyContent: 'flex-end',
    },
    sheet: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 40,
    },
    content: {
        padding: 20,
        gap: 12,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        paddingTop: 20,
    },
    customButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 18,
        padding: 16,
        paddingVertical: 20,
    },
    customText: {
        fontSize: 16,
        fontWeight: '500',
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        fontSize: 24,
    },
    row: {
        gap: 12,
    },
});