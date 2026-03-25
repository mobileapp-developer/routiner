import {getMoodValueByDate} from '@/db/mood';
import {useQuery} from "@tanstack/react-query";

export const MOOD_QUERY_KEY = ['mood'];

export function useTodayMood(userId: number | null, selectedDate?: Date) {
    const targetDate = (selectedDate ?? new Date()).toISOString().split('T')[0];

    const query = useQuery({
        queryKey: [...MOOD_QUERY_KEY, userId, targetDate],
        queryFn: async () => {
            if (!userId) return null;
            return getMoodValueByDate(userId, targetDate);
            },
        enabled: !!userId,
    });

    return {
        mood: query.data ?? null,
        refetch: query.refetch,
        isLoading: query.isLoading || query.isFetching,
        error: query.error,
    };
}