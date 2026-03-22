import {useQuery} from '@tanstack/react-query';
import {getTotalPoints} from '@/db/points';

export const TOTAL_POINTS_QUERY_KEY = ['totalPoints'];

export function useTotalPoints(userId: number | null) {
    return useQuery({
        queryKey: [...TOTAL_POINTS_QUERY_KEY, userId],
        queryFn: () => getTotalPoints(userId!),
        enabled: !!userId,
    });
}