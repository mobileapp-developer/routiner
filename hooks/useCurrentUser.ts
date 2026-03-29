import {useEffect, useState} from 'react';
import {useUser} from '@clerk/clerk-expo';
import {createUser, getUser} from '@/db/user';

export function useCurrentUser() {
    const {user} = useUser();
    const [dbUserId, setDbUserId] = useState<number | null>(null);

    useEffect(() => {
        async function fetch() {
            if (!user?.id) return;

            const result = await getUser(user.id);

            if (result[0]) {
                setDbUserId(result[0].id);
            } else {
                const newUser = await createUser({
                    clerkId: user.id,
                    name: user.firstName
                        ?? user.emailAddresses?.[0]?.emailAddress
                        ?? 'User',
                    gender: 'other',
                });
                setDbUserId(newUser.lastInsertRowId);
            }
        }
        fetch();
    }, [user?.id]);

    return {dbUserId};
}