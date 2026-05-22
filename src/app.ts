import { Hono } from "hono";
import { logger } from "hono/logger";
import GameController from "./controller/GameController.ts";
import { createGame } from "./handlers/gameHandler.ts";

type Variables = {
  gameController: GameController;
};

export const createApp = (gameController: GameController) => {
  const app = new Hono<{ Variables: Variables }>();
  app.use((c, next) => {
    c.set("gameController", gameController);
    return next();
  });
  
  app.use(logger());

  app.get("/", (c) => c.text("Home Page"));
  app.post("/game", createGame);

  return app;
};
