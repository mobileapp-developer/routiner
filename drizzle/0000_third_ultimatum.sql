CREATE TABLE `habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`icon` text,
	`color` text,
	`type` text NOT NULL,
	`goal_value` real,
	`goal_unit` text,
	`frequency_type` text NOT NULL,
	`frequency_days` text,
	`frequency_times` integer,
	`is_active` integer DEFAULT 1,
	`created_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `habit_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`habit_id` integer NOT NULL,
	`date` text NOT NULL,
	`value` real DEFAULT 1,
	`status` text DEFAULT 'done',
	`note` text,
	`logged_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `mood_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`mood` text NOT NULL,
	`date` text NOT NULL,
	`logged_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`clerk_id` text NOT NULL,
	`name` text NOT NULL,
	`gender` text,
	`avatar` text,
	`created_at` text DEFAULT (datetime('now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_clerk_id_unique` ON `user` (`clerk_id`);