import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from './database';
import migrations from '../../drizzle/migrations';

export function useDatabaseMigrations() {
    return useMigrations(db, migrations);
}