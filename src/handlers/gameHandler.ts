import { Context } from "hono";
import GameController from "../controller/GameController.ts";
import { JoinGameView } from "../views/joinGameView.ts";
import { BadRequestError } from "../errors/BadRequestError.ts";
import { SelectHotelPayload } from "../views/selectHotelView.ts";

export const createGame = (c: Context) => {
  const gameController = c.get("gameController") as GameController;
  const game = gameController.createGame(10);
  return c.json({
    success: true,
    message: "Game Created Successfully",
    data: game,
  });
};

export const joinGame = async (c: Context) => {
  const gameController = c.get("gameController") as GameController;
  const body = await c.req.json() as JoinGameView;
  const game = gameController.joinGame(body);
  return c.json({
    success: true,
    message: "Joined Successfully",
    data: game,
  });
};

export const selectHotel = async (c: Context) => {
  const gameController = c.get("gameController") as GameController;
  const body = await c.req.json() as SelectHotelPayload;
  const game = gameController.selectHotel(body);
  return c.json({
    success: true,
    message: "Hotel Selected Successfully",
    data: game,
  });
};

export const startGame = (c: Context) => {
  const gameId = c.req.param("gameId");
  if (!gameId) throw new BadRequestError("Provide Game Id");
  const gameController = c.get("gameController") as GameController;
  const game = gameController.startGame(gameId);

  return c.json({
    success: true,
    message: "Game Started",
    data: game,
  });
};

export const getGameById = (c: Context) => {
  const gameId = c.req.param("gameId");
  if (!gameId) throw new BadRequestError("Provide Game Id");
  const gameController = c.get("gameController") as GameController;
  const game = gameController.getGameById(gameId);

  return c.json({
    success: true,
    message: "Game Started",
    data: game,
  });
};
