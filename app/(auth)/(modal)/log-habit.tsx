import {Animated, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useSlideAnimation} from "@/hooks/useSlideAnimation";
import {palette} from "@/constants/palette";
import {useState} from "react";
import {logHabit} from "@/db/habit_logs";
import {useQueryClient} from "@tanstack/react-query";
import {DAILY_GOALS_QUERY_KEY} from "@/hooks/useDailyGoal";
import {TOTAL_POINTS_QUERY_KEY} from "@/hooks/useTotalPoints";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {awardPoints} from "@/db/points";

export default function LogHabit() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const {dbUserId} = useCurrentUser();
    const {slideValue} = useSlideAnimation();
    const {habitId, habitName, goalUnit, goalValue, currentValue} = useLocalSearchParams<{
        habitId: string;
        habitName: string;
        goalUnit: string;
        goalValue: string;
        currentValue: string;
    }>();

    const [value, setValue] = useState('');

    const handleAdd = async () => {
        if (!value || !habitId) return;

        const addValue = Number(value);
        if (Number.isNaN(addValue) || addValue <= 0) return;

        const goal = Number(goalValue ?? 1);
        const current = Number(currentValue ?? 0);

        await logHabit(Number(habitId), 'done', addValue);

        if (dbUserId && current + addValue >= goal) {
            await awardPoints(dbUserId, Number(habitId));
        }

        await queryClient.invalidateQueries({
            queryKey: DAILY_GOALS_QUERY_KEY
        });

        if (dbUserId) {
            await queryClient.invalidateQueries({
                queryKey: [...TOTAL_POINTS_QUERY_KEY, dbUserId]
            });
        }
        router.back();
    };


    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Pressable style={styles.overlay} onPress={() => router.back()}>
                <Animated.View style={[styles.sheet, {transform: [{translateY: slideValue}]}]}>
                    <Pressable onPress={(e) => e.stopPropagation()} style={styles.content}>
                        <View style={styles.handle}/>

                        <Text style={styles.title}>{habitName}</Text>

                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={setValue}
                                keyboardType="numeric"
                                placeholder={goalValue}
                                placeholderTextColor={palette.primary.black[40]}
                                autoFocus
                            />
                            <Text style={styles.unit}>{goalUnit}</Text>
                        </View>

                        <Pressable style={styles.addButton} onPress={handleAdd} disabled={!dbUserId}>
                            <Text style={styles.addButtonText}>Add</Text>
                        </Pressable>
                    </Pressable>
                </Animated.View>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    sheet: {
        backgroundColor: palette.primary.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 40,
    },
    content: {
        padding: 24,
        gap: 16,
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: palette.primary.black[20],
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: palette.primary.black[100],
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    input: {
        fontSize: 48,
        fontWeight: '700',
        color: palette.primary.black[100],
        textAlign: 'center',
        minWidth: 120,
    },
    unit: {
        fontSize: 24,
        color: palette.primary.black[40],
        fontWeight: '500',
    },
    addButton: {
        backgroundColor: palette.primary.blue[100],
        borderRadius: 40,
        padding: 18,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: palette.primary.white,
    },
});