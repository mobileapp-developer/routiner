import {useQuery} from "@tanstack/react-query"
import {useMemo} from "react";
import {getDailyGoals} from "@/db/habit";

export const DAILY_GOALS_QUERY_KEY = ["daily-goals"];

export function useDailyGoals(userId: number | null, selectedDate?: Date) {
	const targetDate = useMemo(
		() => (selectedDate ?? new Date()).toISOString().split('T')[0],
		[selectedDate]
	);

	const query = useQuery({
		queryKey: [...DAILY_GOALS_QUERY_KEY, userId, targetDate],
		queryFn: () => getDailyGoals(userId!, targetDate),
		enabled: !!userId,
	});
	return {
		completed: query.data?.completed ?? 0,
		total: query.data?.total ?? 0,
		refetch: query.refetch,
		isLoading: query.isLoading || query.isFetching,
		error: query.error,
	}
}