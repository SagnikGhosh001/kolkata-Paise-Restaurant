export class Hotel {
  #id;
  #name;

  constructor(name: string) {
    this.#name = name;
    this.#id = crypto.randomUUID();
  }

  toJson() {
    return {
      id: this.#id,
      name: this.#name,
    };
  }
}
