import { GameField } from "./GameField";
import { FilledBoxCheck } from "./FilledBoxCheck";
import { DEFAULT_SIZE } from "./utils";

export class Game {
  private _currentPlayer = 1;
  private _player1Score: number;
  private _player2Score: number;
  private _playerScores: HTMLDivElement;
  private _information: HTMLDivElement;
  private _gameField: GameField;
  private _filledBoxCheck: FilledBoxCheck;

  constructor(gameBoardElement: HTMLDivElement) {
    this._player1Score = 0;
    this._player2Score = 0;
    this._gameField = new GameField(gameBoardElement);
    this._gameField.setup(this.determineSize());
    this._playerScores = document.getElementById("score") as HTMLDivElement;
    this._information = document.getElementById("information") as HTMLDivElement;
    this._filledBoxCheck = new FilledBoxCheck();

    this.addClickEvents();
    this.setupResetButton();
    this.updateDisplay();
  }

  resetGame = () => {
    this._player1Score = 0;
    this._player2Score = 0;
    this._currentPlayer = 1;
    this._gameField.reset();
    this._gameField.setup(this.determineSize());
    this.addClickEvents();
    this.updateDisplay();
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
    if (this._currentPlayer === 1) {
      this._currentPlayer = 2;
    } else {
      this._currentPlayer = 1;
    }
    this.updateDisplay();
  };

  determineSize(): number {
    const fieldSizeField = document.getElementById("field-size") as HTMLInputElement;
    if (fieldSizeField) {
      return parseInt(fieldSizeField.value) || DEFAULT_SIZE;
    } else {
      return DEFAULT_SIZE;
    }
  }

  setupResetButton(): void {
    const resetButton = document.getElementById("reset-game");
    if (resetButton) {
      resetButton.addEventListener("click", this.resetGame);
    }
  }

  addClickEvents(): void {
    document.querySelectorAll(".line").forEach((line) => {
      line.addEventListener("click", this.lineClicked);
    });
  }

  checkForFilledBox(selectedLine: HTMLDivElement): void {
    let scoreAddition;
    if (selectedLine.classList.contains("line-vertical")) {
      scoreAddition = this._filledBoxCheck.checkForFilledBoxVertical(selectedLine, this._currentPlayer);
    } else {
      scoreAddition = this._filledBoxCheck.checkForFilledBoxHorizontal(selectedLine, this._currentPlayer);
    }

    this.addToScore(scoreAddition);
  }

  addToScore(score: number): void {
    if (this._currentPlayer === 1) {
      this._player1Score += score;
    } else {
      this._player2Score += score;
    }
  }

  updateDisplay(): void {
    this._playerScores.innerHTML = `${this._player1Score} - ${this._player2Score}`;
    if (this.gameIsOver()) {
      this.displayGameOver();
    } else {
      this._information.innerHTML = `Player ${this._currentPlayer}'s Turn`;
    }
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
  }
}
