import {useEffect, useState} from 'react';
import {useUser} from '@clerk/clerk-expo';
import {getUser} from '@/db/user';

export function useCurrentUser() {
    const {user} = useUser();
    const [dbUserId, setDbUserId] = useState<number | null>(null);

    useEffect(() => {
        async function fetch() {
            if (!user?.id) return;
            const result = await getUser(user.id);
            if (result[0]) setDbUserId(result[0].id);
        }
        fetch();
    }, [user?.id]);

    return {dbUserId};
}