export class Player {
  #id;
  #username;
  #currentSelection;

  constructor(username: string) {
    this.#username = username;
    this.#id = crypto.randomUUID();
    this.#currentSelection = "";
  }
}
