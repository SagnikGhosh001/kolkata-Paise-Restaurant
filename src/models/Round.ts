import { Hotel } from "./Hotel.ts";
import { Loads } from "./Loads.ts";
import { Player } from "./player.ts";

enum RoundState {
  RESOLVING = "RESOLVING",
  GLOBAL_REVEAL = "GLOBAL_REVEAL",
  COMPLETED = "COMPLETED",
}

export class Round {
  #id;
  #state: RoundState;
  #selections: Map<Player, Hotel>;
  #hotelPlayers: Map<Hotel, Player[]>;
  #hotelLoads: Map<Hotel, Loads>;
  #winners: Map<Hotel, Player>;

  constructor() {
    this.#id = crypto.randomUUID();
    this.#state = RoundState.RESOLVING;
    this.#selections = new Map();
    this.#hotelPlayers = new Map();
    this.#hotelLoads = new Map();
    this.#winners = new Map();
  }

  toJson() {
    return {
      id: this.#id,
      state: this.#state,
      selection: this.#selections,
      hotelPlayers: this.#hotelPlayers,
      hotelLoads: this.#hotelLoads,
      winners: this.#winners,
    };
  }
}
