import {db} from './database';
import {TInsertUser, user} from './schema';
import {eq} from "drizzle-orm";

export async function createUser(
    data: TInsertUser
) {
    return db.insert(user).values(data);
}

export async function getUser(clerkId: string) {
    return db.select().from(user).where(
        eq(user.clerkId, clerkId)
    )
}