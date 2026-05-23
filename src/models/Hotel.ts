export class Hotel {
  #id;
  #name;

  constructor(name: string) {
    this.#name = name;
    this.#id = crypto.randomUUID();
  }

  isSameId(hotelId: string) {
    return this.#id === hotelId;
  }

  getId() {
    return this.#id;
  }

  toJson() {
    return {
      id: this.#id,
      name: this.#name,
    };
  }
}
