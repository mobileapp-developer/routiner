import {useEffect, useState} from 'react';
import {getTodayMood} from '@/db/mood';

export function useTodayMood(userId: number | null) {
    const [mood, setMood] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        async function fetch() {
            const result = await getTodayMood(userId!);
            if (result) setMood(result.mood);
        }
        fetch();
    }, [userId]);

    return {mood, setMood};
}