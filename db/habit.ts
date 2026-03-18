import {db} from './database';
import {habit, habit_logs, TInsertHabit} from './schema';
import {eq} from "drizzle-orm";

export async function createHabit(data: TInsertHabit) {
    return db.insert(habit).values(data);
}

export async function getHabits(userId: number) {
    return db.select().from(habit).where(
        eq(habit.userId, userId)
    )
}

export async function deleteHabit(habitId: number) {
    await  db.delete(habit_logs).where(eq(habit_logs.habitId, habitId));
    return db.delete(habit).where(eq(habit.id, habitId));
}

