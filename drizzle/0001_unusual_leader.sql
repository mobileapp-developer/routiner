CREATE TABLE `points_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`habit_id` integer NOT NULL,
	`points` integer NOT NULL,
	`date` text NOT NULL,
	`logged_at` text DEFAULT (datetime('now')),
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `habits` ADD `points` integer DEFAULT 10;