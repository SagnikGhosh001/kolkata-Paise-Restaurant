import { Game } from "../models/Game.ts";

export default class GameController {
  #games: Map<string, Game>;

  constructor() {
    this.#games = new Map();
  }

  createGame(totalRounds: number = 10) {
    const game = new Game(totalRounds);
    this.#games.set(game.getId(), game);
    return game;
  }
}
