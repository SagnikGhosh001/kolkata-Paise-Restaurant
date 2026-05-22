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

  private constructor(
    totalRounds: number,
    hotels: Hotel[],
    revelRounds: number[],
  ) {
    this.#id = crypto.randomUUID();
    this.#gameState = GameState.STARTING;
    this.#totalRounds = totalRounds;
    this.#currentRound = 0;
    this.#revelRounds = revelRounds;
    this.#players = [];
    this.#hotels = hotels;
    this.#rounds = [];
  }

  static createGame(totalRounds: number, totalHotels: number) {
    const revelRounds = Array.from({ length: 4 })
      .map((_, i) => Math.floor((totalRounds * (i + 1) * 25) / 100));

    const hotel = Array.from({ length: totalHotels })
      .map((_, i) => new Hotel(`Hotel-${i}`));

    return new Game(totalHotels, hotel, revelRounds);
  }

  getId() {
    return this.#id;
  }

  addPlayer(player: Player) {
    this.#players.push(player);
    return this;
  }

  toJSON() {
    return {
      id: this.#id,
      gameState: this.#gameState,
      totalRounds: this.#totalRounds,
      currentRound: this.#currentRound,
      revelRounds: this.#revelRounds,
      players: this.#players.map((p) => p.toJson()),
      hotels: this.#hotels.map((h) => h.toJson()),
      rounds: this.#rounds,
    };
  }
}
