import { NotFoundError } from "../errors/NotFoundError.ts";
import { Game } from "../models/Game.ts";
import { Player } from "../models/player.ts";
import { JoinGameView } from "../views/joinGameView.ts";

export default class GameController {
  #games: Map<string, Game>;

  constructor() {
    this.#games = new Map();
  }

  createGame(
    totalRounds: number = 2,
    totalHotels: number = 2,
    totalPlayers = 2,
  ) {
    const game = Game.createGame(totalRounds, totalHotels, totalPlayers);
    this.#games.set(game.getId(), game);
    return game.toJSON();
  }

  joinGame(payload: JoinGameView) {
    const player = new Player(payload.username);
    const game = this.getGame(payload.gameId);

    const updatedGame = game.addPlayer(player);
    this.#games.set(updatedGame.getId(), updatedGame);
    return updatedGame.toJSON();
  }

  private getGame(gameId: string) {
    const game = this.#games.get(gameId);
    if (!game) {
      throw new NotFoundError("Game not exist with id " + gameId);
    }

    return game;
  }

  startGame(gameId: string) {
    const game = this.getGame(gameId);
    const updatedGame = game.startGame();
    this.#games.set(updatedGame.getId(), updatedGame);
    return updatedGame.toJSON();
  }

  getGameById(gameId: string) {
    const game = this.getGame(gameId);
    return game.toJSON();
  }
}
