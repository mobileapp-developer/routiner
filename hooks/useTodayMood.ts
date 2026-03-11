import {getMoodByDate} from '@/db/mood';
import {useQuery} from "@tanstack/react-query";

export const MOOD_QUERY_KEY = ['mood'];

export function useTodayMood(userId: number | null, selectedDate?: Date) {
    const targetDate = (selectedDate ?? new Date()).toISOString().split('T')[0];

    const {data, refetch} = useQuery({
        queryKey: [...MOOD_QUERY_KEY, userId, targetDate],
        queryFn: async () => {
            const result = await getMoodByDate(userId!, targetDate);
            return result?.mood ?? null;
        },
        enabled: !!userId
    });

    return {mood: data ?? null, refetch}
}