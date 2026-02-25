import {useCallback, useState} from 'react';
import {db} from '@/db/database';
import {habit, habit_logs, THabit} from '@/db/schema';
import {and, eq} from 'drizzle-orm';
import {useFocusEffect} from 'expo-router';

type HabitWithProgress = {
    habit: THabit;
    currentValue: number;
};

export function useHabits(userId: number | null) {
    const [habits, setHabits] = useState<HabitWithProgress[]>([]);
    const [loading, setLoading] = useState(true);

    const loadHabits = useCallback(async () => {
        if (!userId) return;
        const today = new Date().toISOString().split('T')[0];

        const allHabits = await db
            .select()
            .from(habit)
            .where(and(eq(habit.userId, userId), eq(habit.isActive, 1)));

        const logs = await db
            .select()
            .from(habit_logs)
            .where(eq(habit_logs.date, today));

        const result: HabitWithProgress[] = allHabits.map((h) => {
            const habitLogs = logs.filter((l) => l.habitId === h.id);
            const currentValue = habitLogs.reduce((sum, l) => sum + (l.value ?? 0), 0);
            return {habit: h, currentValue};
        });

        setHabits(result);
        setLoading(false);
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            async function fetchData() {
                await loadHabits();
            }
            fetchData();
        }, [loadHabits])
    );

    return {habits, loading, refetch: loadHabits};
}