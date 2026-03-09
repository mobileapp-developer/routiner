import {habit_logs} from "@/db/schema";
import {db} from "@/db/database";
import {and, eq} from "drizzle-orm";

export async function logHabit(habitId: number, status: 'done' | 'skip' | 'fail', value = 1) {
    const today = new Date().toISOString().split('T')[0];

    const existing = await db
        .select()
        .from(habit_logs)
        .where(and(eq(habit_logs.habitId, habitId), eq(habit_logs.date, today)));

    if (existing[0]) {
        return db
            .update(habit_logs)
            .set({value, status})
            .where(eq(habit_logs.id, existing[0].id))
    }

    return db.insert(habit_logs).values({
        habitId,
        date: today,
        status,
        value,
    });
}