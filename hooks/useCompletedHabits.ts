import {useMemo} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getDailyGoals} from "@/db/habit";

export const COMPLETED_HABITS_QUERY_KEY = ["completed-habits"];

export function useCompletedHabits(userId: number | null, selectedDate?: Date) {
    const dateStr = useMemo(
        () => (selectedDate ?? new Date()).toISOString().split('T')[0],
        [selectedDate]
    );

    const query = useQuery({
        queryKey: [...COMPLETED_HABITS_QUERY_KEY, userId, dateStr],
        queryFn: () => getDailyGoals(userId!, dateStr),
        enabled: !!userId,
    });

    return {
        goals: query.data?.goals ?? [],
        completed: query.data?.completed ?? 0,
        total: query.data?.total ?? 0,
        isLoading: query.isLoading || query.isFetching,
        refetch: query.refetch,
        error: query.error,
    };
}
