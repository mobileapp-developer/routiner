import {db} from './database';
import {habit, habit_logs, TInsertHabit} from './schema';
import {and, eq, inArray, lte} from "drizzle-orm";
import {DailyGoalResult, HabitWithProgress} from "@/constants/types";

export async function createHabit(data: TInsertHabit) {
    return db.insert(habit).values(data);
}

export async function getHabits(userId: number) {
    return db.select().from(habit).where(
        eq(habit.userId, userId)
    )
}

export async function deleteHabit(habitId: number) {
    await db.delete(habit_logs).where(eq(habit_logs.habitId, habitId));
    return db.delete(habit).where(eq(habit.id, habitId));
}

export async function getHabitsWithProgress(userId: number, dateStr: string): Promise<HabitWithProgress[]> {
    const allHabits = await db
        .select()
        .from(habit)
        .where(and(
            eq(habit.userId, userId),
            eq(habit.isActive, 1),
            lte(habit.createdAt, `${dateStr} 23:59:59`)
        ));

    const habitIds = allHabits.map(h => h.id);
    if (habitIds.length === 0) {
        return [];
    }

    const logs = await db
        .select()
        .from(habit_logs)
        .where(and(
            eq(habit_logs.date, dateStr),
            inArray(habit_logs.habitId, habitIds)
        ));

    return allHabits.map((h) => ({
        habit: h,
        currentValue: logs
            .filter((l) => l.habitId === h.id)
            .reduce((sum, l) => sum + (l.value ?? 0), 0),
    }));
}

export async function getDailyGoals(userId: number, targetDate: string): Promise<DailyGoalResult> {
    const allHabits = await db
        .select()
        .from(habit)
        .where(and(
            eq(habit.userId, userId),
            eq(habit.isActive, 1)
        ));

    const habitIds = allHabits.map(h => h.id);

    if (habitIds.length === 0) {
        return {total: 0, completed: 0, goals: []};
    }

    const logs = await db
        .select()
        .from(habit_logs)
        .where(and(
            eq(habit_logs.date, targetDate),
            inArray(habit_logs.habitId, habitIds)
        ));

    const goals = allHabits.map((h) => {
        const habitLog = logs.find((l) => l.habitId === h.id);
        const currentValue = habitLog?.value ?? 0;
        let isCompleted = false;

        if (habitLog && habitLog.status !== 'skip' && habitLog.status !== 'fail') {
            if (h.type === 'yesno') {
                isCompleted = currentValue >= 1;
            } else {
                isCompleted = currentValue >= (h.goalValue ?? 1);
            }
        }

        return {
            habit: h,
            isCompleted,
            currentValue
        };
    });

    const completedCount = goals.filter((g) => g.isCompleted).length;

    return {
        total: allHabits.length,
        completed: completedCount,
        goals,
    };
}