import {useRouter} from "expo-router";
import {Animated, FlatList, Pressable, StyleSheet, Text} from "react-native";
import {palette} from "@/constants/palette";
import {POPULAR_BAD_HABITS} from "@/constants/habits";
import {useSlideAnimation} from "@/hooks/useSlideAnimation";
import {PopularHabitCard} from '@/components/habits/cards/PopularHabitCard'
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {createHabit} from "@/db/habit";
import {useQueryClient} from "@tanstack/react-query";
import {DAILY_GOALS_QUERY_KEY} from "@/hooks/useDailyGoal";
import {HABITS_QUERY_KEY} from "@/hooks/useHabits";

export default function QuitHabit() {
    const router = useRouter();
    const {slideValue} = useSlideAnimation();
    const {dbUserId} = useCurrentUser();

    const queryClient = useQueryClient();

    const handleAddPopular = async (item: typeof POPULAR_BAD_HABITS[0]) => {
        if (!dbUserId) return;

        await createHabit({
            userId: dbUserId,
            name: item.name,
            icon: item.emoji,
            color: item.color,
            type: 'yesno',
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
            <Animated.View style={[styles.sheet, {transform: [{translateY: slideValue}]}]}>
                <Pressable onPress={(e) => e.stopPropagation()} style={styles.content}>

                    <Text style={styles.label}>QUIT BAD HABIT</Text>

                    <Pressable style={styles.customButton} onPress={() => router.push('/(auth)/(habit)/quit-habit')}>
                        <Text style={styles.customText}>Create Custom Habit</Text>
                        <Animated.View style={styles.addButton}>
                            <Text style={styles.plus}>+</Text>
                        </Animated.View>
                    </Pressable>

                    <Text style={styles.label}>POPULAR BAD HABITS</Text>

                    <FlatList
                        data={POPULAR_BAD_HABITS}
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
        backgroundColor: palette.primary.white,
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
        backgroundColor: palette.primary.black[20],
        alignSelf: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: palette.primary.black[40],
        letterSpacing: 1,
        paddingTop: 20,
    },
    customButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: palette.primary.black[10],
        borderRadius: 18,
        padding: 16,
        paddingVertical: 20,
    },
    customText: {
        fontSize: 16,
        fontWeight: '500',
        color: palette.primary.black[100],
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: palette.primary.black[10],
        backgroundColor: palette.primary.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        fontSize: 24,
        color: palette.primary.black[60],
    },
    row: {
        gap: 12,
    },
});