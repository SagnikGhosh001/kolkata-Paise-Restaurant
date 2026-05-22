import { BadRequestError } from "../exception/BadRequestError.ts";
import { Game } from "../models/Game.ts";
import { Player } from "../models/player.ts";
import { JoinGameView } from "../views/joinGameView.ts";

export default class GameController {
  #games: Map<string, Game>;

  constructor() {
    this.#games = new Map();
  }

  createGame(totalRounds: number = 10, totalHotels: number = 10) {
    const game = Game.createGame(totalRounds, totalHotels);
    this.#games.set(game.getId(), game);
    return game;
  }

  joinGame(payload: JoinGameView) {
    const player = new Player(payload.username);
    const game = this.#games.get(payload.gameId);
    if (!game) {
      throw new BadRequestError("Game not exist with id " + payload.gameId);
    }

    const updatedGame = game.addPlayer(player);
    this.#games.set(updatedGame.getId(), updatedGame);
    return updatedGame;
  }
}
