import { Hono } from "hono";
import { logger } from "hono/logger";
import GameController from "./controller/GameController.ts";
import {
  createGame,
  getGameById,
  joinGame,
  startGame,
} from "./handlers/gameHandler.ts";
import { BadRequestError } from "./errors/BadRequestError.ts";
import { NotFoundError } from "./errors/NotFoundError.ts";

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
  app.onError((e, c) => {
    if (e instanceof BadRequestError) {
      return c.json({ error: e.message, success: false }, 400);
    }

    if (e instanceof NotFoundError) {
      return c.json({ error: e.message, success: false }, 404);
    }

    return c.json({ error: e.message, success: false }, 500);
  });

  app.get("/", (c) => c.text("Home Page"));
  app.get("/game/:gameId", getGameById);
  app.post("/game", createGame);
  app.post("/join-game", joinGame);
  app.put("/start-game/:gameId", startGame);

  return app;
};
