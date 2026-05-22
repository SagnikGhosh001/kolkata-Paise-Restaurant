import { createApp } from "./src/app.ts";
import GameController from "./src/controller/GameController.ts";

const main = () => {
  const gameController = new GameController();

  const app = createApp(gameController);
  Deno.serve({ port: 8000 }, app.fetch);
};

main();
