import { BadRequestError } from "../errors/BadRequestError.ts";
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
  #selections: Map<string, Hotel>;
  #hotelPlayers: Map<string, Player[]>;
  #hotelLoads: Map<string, Loads>;
  #winners: Map<string, Player>;

  constructor() {
    this.#id = crypto.randomUUID();
    this.#state = RoundState.RESOLVING;
    this.#selections = new Map();
    this.#hotelPlayers = new Map();
    this.#hotelLoads = new Map();
    this.#winners = new Map();
  }

  mapToJson<K, V>(
    map: Map<K, V>,
    keySerializer: (key: K) => string,
    valueSerializer: (value: V) => unknown,
  ) {
    return Object.fromEntries(
      Array.from(map.entries()).map(([key, value]) => [
        keySerializer(key),
        valueSerializer(value),
      ]),
    );
  }

  private calculateLoadFactor(totalPlayers: number) {
    for (const [hotelId, players] of this.#hotelPlayers.entries()) {
      const loadFactor = (players.length / totalPlayers) * 100;
      this.#hotelLoads.set(hotelId, new Loads(players.length, loadFactor));
    }
  }

  private setWinner() {
    for (const [hotelId, players] of this.#hotelPlayers.entries()) {
      if (players.length > 1) {
        const randomIndex = Math.floor(Math.random() * players.length);
        const winner = players[randomIndex];
        this.#winners.set(hotelId, winner);
      } else {
        this.#winners.set(hotelId, players[0]);
      }
    }
  }

  addSelection(player: Player, hotel: Hotel, totalPlayers: number) {
    if (this.#state !== RoundState.RESOLVING) {
      throw new BadRequestError(
        "You can't add your selection to this round now",
      );
    }

    const playersInHotel = this.#hotelPlayers.get(hotel.getId()) || [];
    playersInHotel.push(player);
    this.#hotelPlayers.set(hotel.getId(), playersInHotel);
    this.#selections.set(player.getId(), hotel);

    if (this.#selections.size === totalPlayers) {
      this.#state = RoundState.COMPLETED;
      this.calculateLoadFactor(totalPlayers);
      this.setWinner();
    }
  }

  toJson() {
    return {
      id: this.#id,
      state: this.#state,
      selection: this.mapToJson(
        this.#selections,
        (playerId) => playerId,
        (hotel) => hotel.toJson(),
      ),

      hotelPlayers: this.mapToJson(
        this.#hotelPlayers,
        (hotelId) => hotelId,
        (players) => players.map((p) => p.toJson()),
      ),

      hotelLoads: this.mapToJson(
        this.#hotelLoads,
        (hotelId) => hotelId,
        (loads) => loads.toJson(),
      ),

      winners: this.mapToJson(
        this.#winners,
        (hotelId) => hotelId,
        (player) => player.toJson(),
      ),
    };
  }
}
