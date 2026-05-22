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

  constructor(totalRounds: number) {
    this.#id = crypto.randomUUID();
    this.#gameState = GameState.STARTING;
    this.#totalRounds = totalRounds;
    this.#currentRound = 0;
    this.#revelRounds = [];
    this.#players = [];
    this.#hotels = [];
    this.#rounds = [];
  }

  getId() {
    return this.#id;
  }

  toJSON() {
    return {
      id: this.#id,
      gameState: this.#gameState,
      totalRounds: this.#totalRounds,
      currentRound: this.#currentRound,
      revelRounds: this.#revelRounds,
      players: this.#players,
      hotels: this.#hotels,
      rounds: this.#rounds,
    };
  }
}
