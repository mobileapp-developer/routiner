import {and, eq} from 'drizzle-orm';
import {db} from "@/db/database";
import {habit, habit_logs} from '@/db/schema';
import {useQuery} from "@tanstack/react-query"

export const DAILY_GOALS_QUERY_KEY = ["daily-goals"]

export function useDailyGoals(userId: number, selectedDate?: Date) {
	const targetDate = (selectedDate ?? new Date()).toISOString().split("T")[0];

	const {data} = useQuery({
		queryKey: [...DAILY_GOALS_QUERY_KEY, targetDate],
		queryFn: async () => {

			const allHabits = await db
				.select()
				.from(habit)
				.where(and(eq(habit.userId, userId), eq(habit.isActive, 1)));

			const logs = await db
				.select()
				.from(habit_logs)
				.where(eq(habit_logs.date, targetDate));

			const completedCount = allHabits.filter((h) => {
				const habitLog = logs.find((l) => l.habitId === h.id);
				if (!habitLog) return false;
				if (habitLog.status === 'skip' || habitLog.status === 'fail') return false;
				if (h.type === 'yesno') return (habitLog.value ?? 0) >= 1;
				return (habitLog.value ?? 0) >= (h.goalValue ?? 1);
			}).length;

			return  {
				total: allHabits.length,
				completed: completedCount
			}
		},
		enabled: !!userId
	})

	return {completed: data?.completed || 0, total: data?.total || 0};
}