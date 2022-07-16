import { Game } from "./Game";

function init() {
  const gameField = document.getElementById("grid") as HTMLDivElement;
  new Game(gameField);
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
