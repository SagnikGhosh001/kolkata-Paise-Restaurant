import { Hono } from "hono";
import { logger } from "hono/logger";

export const createApp = () => {
  const app = new Hono();
  app.use(logger());

  app.get("/home", (c) => c.text("Hi"));
  return app;
};
