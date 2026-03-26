import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getHabitsWithProgress} from '@/db/habit';

export function useHabits(userId: number | null, selectedDate?: Date) {
    const dateStr = useMemo(
        () => (selectedDate ?? new Date()).toISOString().split('T')[0],
        [selectedDate]
    );

    const query = useQuery({
        queryKey: ['habits-with-progress', userId, dateStr],
        queryFn: () => getHabitsWithProgress(userId!, dateStr),
        enabled: !!userId,
    });

    return {
        habits: query.data ?? [],
        loading: query.isLoading || query.isFetching,
        refetch: query.refetch,
        error: query.error,
    };
}