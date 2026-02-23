import {habit, habit_logs, THabit} from "@/db/schema";
import {useEffect, useState} from "react";
import {db} from "@/db/database";
import {and, eq} from "drizzle-orm";

type HabitWithProgress = {
    habit: THabit,
    currentValue: number,
}

export function useHabits(userId: number) {
    const [habits, setHabits] = useState<HabitWithProgress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (!userId) return;

        async function fetch() {
            const allHabits = await db
                .select()
                .from(habit)
                .where(and(eq(habit.userId, userId), eq(habit.isActive, 1)));

            const logs = await db
                .select()
                .from(habit_logs)
                .where(eq(habit_logs.date, today))

            const result: HabitWithProgress[] = allHabits.map((h) => {
                const habitLogs = logs.filter((l) => l.habitId === h.id);
                const currentValue = habitLogs.reduce((sum, l) => sum + (l.value ?? 0), 0);
                return {habit: h, currentValue};
            });

            setHabits(result);
            setLoading(false);
        }

        fetch();
    }, [userId]);
    return {habits, loading};
}