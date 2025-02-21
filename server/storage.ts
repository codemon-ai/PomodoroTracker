import { users, type User, type InsertUser } from "@shared/schema";
import { pomodoroSessions, type PomodoroSession, type InsertPomodoroSession } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  createPomodoroSession(session: InsertPomodoroSession): Promise<PomodoroSession>;
  completePomodoroSession(id: number): Promise<PomodoroSession | undefined>;
  getRecentSessions(limit?: number): Promise<PomodoroSession[]>;
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  async createPomodoroSession(session: InsertPomodoroSession): Promise<PomodoroSession> {
    const [newSession] = await db
      .insert(pomodoroSessions)
      .values(session)
      .returning();
    return newSession;
  }

  async completePomodoroSession(id: number): Promise<PomodoroSession | undefined> {
    const [updatedSession] = await db
      .update(pomodoroSessions)
      .set({
        completed: true,
        endedAt: new Date()
      })
      .where(eq(pomodoroSessions.id, id))
      .returning();
    return updatedSession;
  }

  async getRecentSessions(limit: number = 10): Promise<PomodoroSession[]> {
    return await db
      .select()
      .from(pomodoroSessions)
      .orderBy(pomodoroSessions.startedAt)
      .limit(limit);
  }
    async getUser(id: number): Promise<User | undefined> {
        //Implementation for getting user from database.  Needs to be added based on your database schema.
        throw new Error("Method not implemented.");
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        //Implementation for getting user by username from database. Needs to be added based on your database schema.
        throw new Error("Method not implemented.");
    }

    async createUser(user: InsertUser): Promise<User> {
        //Implementation for creating a user in the database. Needs to be added based on your database schema.
        throw new Error("Method not implemented.");
    }
}

export const storage = new DatabaseStorage();