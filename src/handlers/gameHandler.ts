import { Context } from "hono";
import GameController from "../controller/GameController.ts";

export const createGame = (c: Context) => {
  const gameController = c.get("gameController") as GameController;
  const game = gameController.createGame(10);
  return c.json({
    success: true,
    message: "Game Created Successfully",
    data: game.toJSON(),
  });
};
