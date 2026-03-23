import {useQuery} from "@tanstack/react-query";
import {getPointsLogs} from "@/db/points";

export function usePointsLogs(userId: number | null, from: string, to: string) {
    return useQuery({
        queryKey: ['points-logs', userId, from, to],
        queryFn: () => getPointsLogs(userId!, from, to),
        enabled: !!userId,
    });
}