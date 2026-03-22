import {db} from "@/db/database";
import {habit, points_logs} from "@/db/schema";
import {and, eq} from "drizzle-orm";

export async function awardPoints(userId: number, habitId: number) {
    const date = new Date().toISOString().split('T')[0];

    const existing = await db
        .select()
        .from(points_logs)
        .where(and(eq(points_logs.habitId, habitId), eq(points_logs.date, date)));

    if (existing[0]) return;

    const habitData = await db
        .select()
        .from(habit)
        .where(eq(habit.id, habitId));

    if (!habitData[0]) return;

    const points = habitData[0].points ?? 10;

    return db.insert(points_logs).values({
        userId,
        habitId,
        points,
        date,
    });
}

export async function getTotalPoints(userId: number) {
    const logs = await db
        .select()
        .from(points_logs)
        .where(eq(points_logs.userId, userId));

    return Math.max(logs.reduce((sum, log) => sum + log.points, 0));
}

export async function deductPoints(userId: number, habitId: number) {
    const date = new Date().toISOString().split('T')[0];

    const habitData = await db
        .select()
        .from(habit)
        .where(eq(habit.id, habitId));

    if (!habitData[0]) return;

    const points = habitData[0].points ?? 10;
    console.log('habit points from DB:', habitData[0].points, 'using:', points);

    return db.insert(points_logs).values({
        userId,
        habitId,
        points: -points,
        date,
    });
}