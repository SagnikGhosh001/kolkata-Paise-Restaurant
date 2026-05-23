export class Loads {
  #playerCount;
  #loadFactor;
  constructor(playerCount: number, loadFactor: number) {
    this.#loadFactor = loadFactor;
    this.#playerCount = playerCount;
  }

  toJson() {
    return {
      loadFactor: this.#loadFactor,
      playerCount: this.#playerCount,
    };
  }
}
