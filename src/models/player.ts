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

  toJson() {
    return {
      id: this.#id,
      username: this.#username,
    };
  }
}
