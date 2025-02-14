import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const pomodoroSessions = pgTable("pomodoro_sessions", {
  id: serial("id").primaryKey(),
  minutes: integer("minutes").notNull(),
  completed: boolean("completed").notNull().default(false),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
});

export const insertPomodoroSessionSchema = createInsertSchema(pomodoroSessions).omit({
  id: true,
  completed: true,
  endedAt: true,
});

export type InsertPomodoroSession = z.infer<typeof insertPomodoroSessionSchema>;
export type PomodoroSession = typeof pomodoroSessions.$inferSelect;