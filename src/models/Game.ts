import { BadRequestError } from "../errors/BadRequestError.ts";
import { Hotel } from "./Hotel.ts";
import { Player } from "./player.ts";
import { Round } from "./Round.ts";

enum GameState {
  WAITING_FOR_PLAYERS = "WAITING_FOR_PLAYERS",
  STARTING = "STARTING",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export class Game {
  #id;
  #gameState: GameState;
  #totalRounds;
  #currentRound;
  #revelRounds: number[];
  #players: Player[];
  #hotels: Hotel[];
  #rounds: Round[];
  #totalPlayers: number;

  private constructor(
    totalRounds: number,
    hotels: Hotel[],
    revelRounds: number[],
    totalPlayers: number,
  ) {
    this.#id = crypto.randomUUID();
    this.#gameState = GameState.STARTING;
    this.#totalRounds = totalRounds;
    this.#currentRound = 0;
    this.#revelRounds = revelRounds;
    this.#players = [];
    this.#hotels = hotels;
    this.#rounds = [];
    this.#totalPlayers = totalPlayers;
  }

  static createGame(
    totalRounds: number,
    totalHotels: number,
    totalPlayers: number,
  ) {
    const revelRounds = Array.from({ length: 4 })
      .map((_, i) => Math.floor((totalRounds * (i + 1) * 25) / 100));

    const hotel = Array.from({ length: totalHotels })
      .map((_, i) => new Hotel(`Hotel-${i}`));

    return new Game(totalRounds, hotel, revelRounds, totalPlayers);
  }

  getId() {
    return this.#id;
  }

  addPlayer(player: Player) {
    if (this.#players.length == this.#totalPlayers) {
      throw new BadRequestError("Game Is Already Fulled");
    }

    if (this.isPlayerExist(player)) {
      throw new BadRequestError("Player Already Exist with username");
    }

    this.#players.push(player);
    return this;
  }

  private isPlayerExist(player: Player) {
    return this.#players.some((p) => p.isSameUserName(player));
  }

  startGame() {
    if (this.#players.length < this.#totalPlayers) {
      throw new BadRequestError("Total Player should be " + this.#totalPlayers);
    }

    const round = new Round();
    this.#rounds.push(round);
    this.#gameState = GameState.IN_PROGRESS;
    return this;
  }

  toJSON() {
    return {
      id: this.#id,
      gameState: this.#gameState,
      totalRounds: this.#totalRounds,
      currentRound: this.#currentRound,
      totalPlayers: this.#totalPlayers,
      revelRounds: this.#revelRounds,
      players: this.#players.map((p) => p.toJson()),
      hotels: this.#hotels.map((h) => h.toJson()),
      rounds: this.#rounds.map((r) => r.toJson()),
    };
  }
}
