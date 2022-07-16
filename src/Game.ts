import { GameField } from "./GameField";

export class Game {
  constructor(gameBoardElement: HTMLDivElement) {
    const gameField = new GameField(gameBoardElement);
    gameField.setup();

    document.querySelectorAll(".line").forEach((line) => {
      line.addEventListener("click", this.lineClicked);
    });
  }

  lineClicked = (event: Event) => {
    event.preventDefault();

    const line = event.target as HTMLDivElement;

    if (line.classList.contains("line-selected")) {
      return;
    }

    line.removeEventListener("click", this.lineClicked);
    line.classList.remove("line-available");
    line.classList.add("line-selected");
  };
}
