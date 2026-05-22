import { Context } from "hono";
import GameController from "../controller/GameController.ts";
import { JoinGameView } from "../views/joinGameView.ts";

export const createGame = (c: Context) => {
  const gameController = c.get("gameController") as GameController;
  const game = gameController.createGame(10);
  return c.json({
    success: true,
    message: "Game Created Successfully",
    data: game.toJSON(),
  });
};

export const joinGame = async (c: Context) => {
  const gameController = c.get("gameController") as GameController;
  const body = await c.req.json() as JoinGameView;
  const game = gameController.joinGame(body);
  return c.json({
    success: true,
    message: "Joined Successfully",
    data: game.toJSON(),
  });
};
