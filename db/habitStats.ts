import {db} from './database';
import {habit, habit_logs} from './schema';
import {and, eq, gte, lte, sql} from 'drizzle-orm';

export async function getHabitsSummary(userId: number, from: string, to: string) {
    const rows = await db
        .select({
            status: habit_logs.status,
            count: sql<number>`count(*)`.as('count'),
        })
        .from(habit_logs)
        .innerJoin(habit, eq(habit.id, habit_logs.habitId))
        .where(and(
            eq(habit.userId, userId),
            gte(habit_logs.date, from),
            lte(habit_logs.date, to),
        ))
        .groupBy(habit_logs.status);

    const done  = rows.find(r => r.status === 'done')?.count  ?? 0;
    const skip  = rows.find(r => r.status === 'skip')?.count  ?? 0;
    const fail  = rows.find(r => r.status === 'fail')?.count  ?? 0;
    const total = done + skip + fail;

    return {
        completed: done,
        skipped: skip,
        failed: fail,
        successRate: total > 0 ? Math.round((done / total) * 100) : 0,
    };
}

export async function getHabitsLineData(userId: number, from: string, to: string) {
    return db
        .select({
            date: habit_logs.date,
            count: sql<number>`count(*)`.as('count'),
        })
        .from(habit_logs)
        .innerJoin(habit, eq(habit.id, habit_logs.habitId))
        .where(and(
            eq(habit.userId, userId),
            gte(habit_logs.date, from),
            lte(habit_logs.date, to),
            eq(habit_logs.status, 'done'),
        ))
        .groupBy(habit_logs.date)
        .orderBy(habit_logs.date);
}

export async function getBestStreak(userId: number) {
    const logs = await db
        .select({ date: habit_logs.date })
        .from(habit_logs)
        .innerJoin(habit, eq(habit.id, habit_logs.habitId))
        .where(and(
            eq(habit.userId, userId),
            eq(habit_logs.status, 'done'),
        ))
        .groupBy(habit_logs.date)
        .orderBy(habit_logs.date);

    let best = 0, current = 0;
    for (let i = 0; i < logs.length; i++) {
        if (i === 0) { current = 1; continue; }
        const prev = new Date(logs[i - 1].date);
        const curr = new Date(logs[i].date);
        prev.setDate(prev.getDate() + 1);
        current = prev.toISOString().split('T')[0] === curr.toISOString().split('T')[0]
            ? current + 1 : 1;
        if (current > best) best = current;
    }
    return best;
}