import { GameField } from "./GameField";

export class Game {
  private _currentPlayer = 1;
  private _player1Score: number;
  private _player2Score: number;
  private _playerScores: HTMLDivElement;
  private _information: HTMLDivElement;
  private _gameField: GameField;

  constructor(gameBoardElement: HTMLDivElement) {
    this._player1Score = 0;
    this._player2Score = 0;
    this._gameField = new GameField(gameBoardElement);
    this._gameField.setup();
    this._playerScores = document.getElementById("score") as HTMLDivElement;
    this._information = document.getElementById("information") as HTMLDivElement;

    this.addClickEvents();
    this.displayScores();
    this.displayTurn();
  }

  resetGame = () => {
    this._player1Score = 0;
    this._player2Score = 0;
    this._gameField.reset();
    this._gameField.setup();
    this.addClickEvents();
    this.displayScores();
    this.displayTurn();
  };

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
    this.displayScores();

    if (this._currentPlayer === 1) {
      this._currentPlayer = 2;
    } else {
      this._currentPlayer = 1;
    }
    if (this.gameIsOver()) {
      this.displayGameOver();
    } else {
      this.displayTurn();
    }
  };

  addClickEvents(): void {
    document.querySelectorAll(".line").forEach((line) => {
      line.addEventListener("click", this.lineClicked);
    });
  }

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
        document
          .getElementById(`box-${row}x${column - 1}`)
          ?.classList.add(`box-filled-${this._currentPlayer}`, "box-filled");
        document.getElementById(`box-${row}x${column - 1}`)?.classList.remove("box-available");
        this.addToScore();
      }
    }
    const next = document.getElementById(`vertical-${row}x${column + 1}`);
    if (next?.classList.contains("line-selected")) {
      const north = document.getElementById(`horizontal-${row - 1}x${column}`);
      const south = document.getElementById(`horizontal-${row + 1}x${column}`);
      if (north?.classList.contains("line-selected") && south?.classList.contains("line-selected")) {
        document
          .getElementById(`box-${row}x${column}`)
          ?.classList.add(`box-filled-${this._currentPlayer}`, "box-filled");
        document.getElementById(`box-${row}x${column}`)?.classList.remove("box-available");
        this.addToScore();
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
        document
          .getElementById(`box-${row - 1}x${column}`)
          ?.classList.add(`box-filled-${this._currentPlayer}`, "box-filled");
        document.getElementById(`box-${row - 1}x${column}`)?.classList.remove("box-available");
        this.addToScore();
      }
    }
    const next = document.getElementById(`horizontal-${row + 2}x${column}`);
    if (next?.classList.contains("line-selected")) {
      const west = document.getElementById(`vertical-${row + 1}x${column}`);
      const east = document.getElementById(`vertical-${row + 1}x${column + 1}`);
      if (west?.classList.contains("line-selected") && east?.classList.contains("line-selected")) {
        document
          .getElementById(`box-${row + 1}x${column}`)
          ?.classList.add(`box-filled-${this._currentPlayer}`, "box-filled");
        document.getElementById(`box-${row + 1}x${column}`)?.classList.remove("box-available");
        this.addToScore();
      }
    }
  }

  addToScore(): void {
    if (this._currentPlayer === 1) {
      this._player1Score++;
    } else {
      this._player2Score++;
    }
  }

  displayScores(): void {
    this._playerScores.innerHTML = `${this._player1Score} - ${this._player2Score}`;
  }

  displayTurn(): void {
    this._information.innerHTML = `Player ${this._currentPlayer}'s Turn`;
  }

  gameIsOver(): boolean {
    return document.querySelectorAll(".box-available").length === 0;
  }

  displayGameOver(): void {
    let winningPlayer = 0;
    if (document.querySelectorAll(".box-filled-1").length > document.querySelectorAll(".box-filled-2").length) {
      winningPlayer = 1;
    } else if (document.querySelectorAll(".box-filled-1").length < document.querySelectorAll(".box-filled-2").length) {
      winningPlayer = 2;
    }

    if (winningPlayer === 0) {
      this._information.innerHTML = "Game over! It's a tie!";
    } else {
      this._information.innerHTML = `Game over! Player ${winningPlayer} wins!`;
    }

    const button = document.createElement("button");
    button.addEventListener("click", this.resetGame);
    button.innerHTML = "Play again";
    this._information.appendChild(button);
  }
}
