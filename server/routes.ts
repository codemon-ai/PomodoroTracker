import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPomodoroSessionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/pomodoro-sessions", async (req, res) => {
    try {
      const sessionData = insertPomodoroSessionSchema.parse({
        minutes: req.body.minutes,
        startedAt: new Date(),
      });

      const session = await storage.createPomodoroSession(sessionData);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid session data" });
    }
  });

  app.post("/api/pomodoro-sessions/:id/complete", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const session = await storage.completePomodoroSession(id);

      if (!session) {
        res.status(404).json({ error: "Session not found" });
        return;
      }

      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/pomodoro-sessions/recent", async (_req, res) => {
    try {
      const sessions = await storage.getRecentSessions();
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sessions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}