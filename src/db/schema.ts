import {int, real, text, sqliteTable} from 'drizzle-orm/sqlite-core';
import {sql} from "drizzle-orm";

export const user = sqliteTable('user', {
    id:         int('id').primaryKey({autoIncrement: true}),
    name:       text('name').notNull(),
    gender:     text('gender'),
    avatar:     text('avatar'),
    created_at: text('created_at').default(sql`(datetime('now'))`),
});

export const habits = sqliteTable('habits', {
    id:               int('id').primaryKey({ autoIncrement: true }),
    user_id:          int('user_id').notNull().references(() => user.id),
    name:             text('name').notNull(),
    description:      text('description'),
    icon:             text('icon'),
    color:            text('color'),
    type:             text('type', { enum: ['yesno', 'count', 'time'] }).notNull(),
    goal_value:       real('goal_value'),
    goal_unit:        text('goal_unit'),
    frequency_type:   text('frequency_type', { enum: ['daily', 'weekly_days', 'weekly_times'] }).notNull(),
    frequency_days:   text('frequency_days'),   // JSON string: '["mon","wed","fri"]'
    frequency_times:  int('frequency_times'),
    is_active:        int('is_active').default(1),
    created_at:       text('created_at').default(sql`(datetime('now'))`),
});

export const habit_logs = sqliteTable('habit_logs', {
    id:         int('id').primaryKey({ autoIncrement: true }),
    habit_id:   int('habit_id').notNull().references(() => habits.id),
    date:       text('date').notNull(),
    value:      real('value').default(1),
    note:       text('note'),
    logged_at:  text('logged_at').default(sql`(datetime('now'))`),
});