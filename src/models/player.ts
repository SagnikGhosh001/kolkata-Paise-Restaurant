import { Hotel } from "./Hotel.ts";

export class Player {
  #id;
  #username;
  #currentSelection: Hotel | null;

  constructor(username: string) {
    this.#username = username;
    this.#id = crypto.randomUUID();
    this.#currentSelection = null;
  }

  isSameUserName(player: Player) {
    return this.#username === player.#username;
  }

  toJson() {
    return {
      id: this.#id,
      username: this.#username,
    };
  }
}
