import {useQuery} from '@tanstack/react-query';
import {getBestStreak, getHabitsLineData, getHabitsSummary} from '@/db/habit_stats';
import {getMoodByRange} from "@/db/mood";

export function useHabitsSummary(userId: number, from: string, to: string) {
    return useQuery({
        queryKey: ['habits-summary', userId, from, to],
        queryFn: () => getHabitsSummary(userId, from, to),
        enabled: !!userId,
    });
}

export function useHabitsLineData(userId: number, from: string, to: string) {
    return useQuery({
        queryKey: ['habits-line', userId, from, to],
        queryFn: () => getHabitsLineData(userId, from, to),
        enabled: !!userId,
    });
}

export function useBestStreak(userId: number) {
    return useQuery({
        queryKey: ['best-streak', userId],
        queryFn: () => getBestStreak(userId),
        enabled: !!userId,
    });
}

export function useMoodRange(userId: number, from: string, to: string) {
    return useQuery({
        queryKey: ['mood-range', userId, from, to],
        queryFn: () => getMoodByRange(userId, from, to),
        enabled: !!userId,
    });
}