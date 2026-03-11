import {db} from './database';
import {mood_logs, TInsertMoodLog} from './schema';
import {and, eq} from "drizzle-orm";

export async function logMood(data: TInsertMoodLog) {
    const date = data.date ?? new Date().toISOString().split('T')[0];

    const existing = await db
        .select()
        .from(mood_logs)
        .where(and(eq(mood_logs.userId, data.userId), eq(mood_logs.date, date)));

    if (existing[0]) {
        return db
            .update(mood_logs)
            .set({mood: data.mood})
            .where(eq(mood_logs.id, existing[0].id));
    }

    return db.insert(mood_logs).values(data);
}

export async function getMoodByDate(userId: number, date: string) {
    const result = await db
        .select()
        .from(mood_logs)
        .where(and(eq(mood_logs.userId, userId), eq(mood_logs.date, date)))
        .limit(1);
    return result[0] ?? null;
}