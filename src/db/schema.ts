import {int, real, text, sqliteTable} from 'drizzle-orm/sqlite-core';
import {sql} from "drizzle-orm";

export const user = sqliteTable('user', {
    id:         int('id').primaryKey({autoIncrement: true}),
    clerkId:    text('clerk_id').notNull().unique(),
    name:       text('name').notNull(),
    gender:     text('gender'),
    avatar:     text('avatar'),
    createdAt:  text('created_at').default(sql`(datetime('now'))`),
});

export type TUser = typeof user.$inferSelect
export type TInsertUser = typeof user.$inferInsert

export const habit = sqliteTable('habits', {
    id:               int('id').primaryKey({ autoIncrement: true }),
    userId:           int('user_id').notNull().references(() => user.id),
    name:             text('name').notNull(),
    description:      text('description'),
    icon:             text('icon'),
    color:            text('color'),
    type:             text('type', { enum: ['yesno', 'count', 'time'] }).notNull(),
    goalValue:        real('goal_value'),
    goalUnit:         text('goal_unit'),
    frequencyType:    text('frequency_type', { enum: ['daily', 'weekly_days', 'weekly_times'] }).notNull(),
    frequencyDays:    text('frequency_days'),
    frequencyTimes:   int('frequency_times'),
    isActive:         int('is_active').default(1),
    createdAt:        text('created_at').default(sql`(datetime('now'))`),
});

export type THabit = typeof habit.$inferSelect
export type TInsertHabit = typeof habit.$inferInsert

export const habit_logs = sqliteTable('habit_logs', {
    id:         int('id').primaryKey({ autoIncrement: true }),
    habitId:    int('habit_id').notNull().references(() => habit.id),
    date:       text('date').notNull(),
    value:      real('value').default(1),
    note:       text('note'),
    loggedAt:   text('logged_at').default(sql`(datetime('now'))`),
});