import {and, eq} from 'drizzle-orm';
import {useEffect, useState} from 'react';
import {db} from "@/db/database";
import {habit, habit_logs} from '@/db/schema';

export function useDailyGoals(userId: number) {
	const [completed, setCompleted] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const today = new Date().toISOString().split("T")[0];

		async function fetch() {
			const allHabits = await db
				.select()
				.from(habit)
				.where(and(eq(habit.userId, userId), eq(habit.frequencyType, "daily"), eq(habit.isActive, 1)));

			const logs = await db.select().from(habit_logs).where(eq(habit_logs.date, today));

			const completedIds = new Set(logs.map((l) => l.habitId));
			const completedCount = allHabits.filter((h) => completedIds.has(h.id)).length;

			setTotal(allHabits.length);
			setCompleted(completedCount);
		}

		fetch();
	}, [userId]);

	return { completed, total };
}
