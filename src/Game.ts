import { GameField } from "./GameField";

export class Game {
  private _currentPlayer = 1;

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
    line.classList.add("line-selected", `line-selected-${this._currentPlayer}`);

    this.checkForFilledBox(line);

    if (this._currentPlayer === 1) {
      this._currentPlayer = 2;
    } else {
      this._currentPlayer = 1;
    }
  };

  checkForFilledBox(selectedLine: HTMLDivElement): void {
    if (selectedLine.classList.contains("line-vertical")) {
      this.checkForFilledBoxVertical(selectedLine);
    } else {
      this.checkForFilledBoxHorizontal(selectedLine);
    }
  }

  checkForFilledBoxVertical(selectedLine: HTMLDivElement): void {
    const row = parseInt(selectedLine.dataset.row as string);
    const column = parseInt(selectedLine.dataset.column as string);
    const previous = document.getElementById(`vertical-${row}x${column - 1}`);
    if (previous?.classList.contains("line-selected")) {
      const north = document.getElementById(`horizontal-${row - 1}x${column - 1}`);
      const south = document.getElementById(`horizontal-${row + 1}x${column - 1}`);
      if (north?.classList.contains("line-selected") && south?.classList.contains("line-selected")) {
        document.getElementById(`box-${row}x${column - 1}`)?.classList.add(`box-filled-${this._currentPlayer}`);
      }
    }
    const next = document.getElementById(`vertical-${row}x${column + 1}`);
    if (next?.classList.contains("line-selected")) {
      const north = document.getElementById(`horizontal-${row - 1}x${column}`);
      const south = document.getElementById(`horizontal-${row + 1}x${column}`);
      if (north?.classList.contains("line-selected") && south?.classList.contains("line-selected")) {
        document.getElementById(`box-${row}x${column}`)?.classList.add(`box-filled-${this._currentPlayer}`);
      }
    }
  }

  checkForFilledBoxHorizontal(selectedLine: HTMLDivElement): void {
    const row = parseInt(selectedLine.dataset.row as string);
    const column = parseInt(selectedLine.dataset.column as string);
    const previous = document.getElementById(`horizontal-${row - 2}x${column}`);
    if (previous?.classList.contains("line-selected")) {
      const west = document.getElementById(`vertical-${row - 1}x${column}`);
      const east = document.getElementById(`vertical-${row - 1}x${column + 1}`);
      if (west?.classList.contains("line-selected") && east?.classList.contains("line-selected")) {
        document.getElementById(`box-${row - 1}x${column}`)?.classList.add(`box-filled-${this._currentPlayer}`);
      }
    }
    const next = document.getElementById(`horizontal-${row + 2}x${column}`);
    if (next?.classList.contains("line-selected")) {
      const west = document.getElementById(`vertical-${row + 1}x${column}`);
      const east = document.getElementById(`vertical-${row + 1}x${column + 1}`);
      if (west?.classList.contains("line-selected") && east?.classList.contains("line-selected")) {
        document.getElementById(`box-${row + 1}x${column}`)?.classList.add(`box-filled-${this._currentPlayer}`);
      }
    }
  }
}
