export class FilledBoxCheck {
  checkForFilledBoxVertical(selectedLine: HTMLDivElement, currentPlayer: number): number {
    const row = parseInt(selectedLine.dataset.row as string);
    const column = parseInt(selectedLine.dataset.column as string);
    const previous = document.getElementById(`vertical-${row}x${column - 1}`);
    let result = 0;
    if (previous?.classList.contains("line-selected")) {
      const north = document.getElementById(`horizontal-${row - 1}x${column - 1}`);
      const south = document.getElementById(`horizontal-${row + 1}x${column - 1}`);
      if (north?.classList.contains("line-selected") && south?.classList.contains("line-selected")) {
        document.getElementById(`box-${row}x${column - 1}`)?.classList.add(`box-filled-${currentPlayer}`, "box-filled");
        document.getElementById(`box-${row}x${column - 1}`)?.classList.remove("box-available");
        result++;
      }
    }
    const next = document.getElementById(`vertical-${row}x${column + 1}`);
    if (next?.classList.contains("line-selected")) {
      const north = document.getElementById(`horizontal-${row - 1}x${column}`);
      const south = document.getElementById(`horizontal-${row + 1}x${column}`);
      if (north?.classList.contains("line-selected") && south?.classList.contains("line-selected")) {
        document.getElementById(`box-${row}x${column}`)?.classList.add(`box-filled-${currentPlayer}`, "box-filled");
        document.getElementById(`box-${row}x${column}`)?.classList.remove("box-available");
        result++;
      }
    }

    return result;
  }

  checkForFilledBoxHorizontal(selectedLine: HTMLDivElement, currentPlayer: number): number {
    const row = parseInt(selectedLine.dataset.row as string);
    const column = parseInt(selectedLine.dataset.column as string);
    const previous = document.getElementById(`horizontal-${row - 2}x${column}`);
    let result = 0;
    if (previous?.classList.contains("line-selected")) {
      const west = document.getElementById(`vertical-${row - 1}x${column}`);
      const east = document.getElementById(`vertical-${row - 1}x${column + 1}`);
      if (west?.classList.contains("line-selected") && east?.classList.contains("line-selected")) {
        document.getElementById(`box-${row - 1}x${column}`)?.classList.add(`box-filled-${currentPlayer}`, "box-filled");
        document.getElementById(`box-${row - 1}x${column}`)?.classList.remove("box-available");
        result++;
      }
    }
    const next = document.getElementById(`horizontal-${row + 2}x${column}`);
    if (next?.classList.contains("line-selected")) {
      const west = document.getElementById(`vertical-${row + 1}x${column}`);
      const east = document.getElementById(`vertical-${row + 1}x${column + 1}`);
      if (west?.classList.contains("line-selected") && east?.classList.contains("line-selected")) {
        document.getElementById(`box-${row + 1}x${column}`)?.classList.add(`box-filled-${currentPlayer}`, "box-filled");
        document.getElementById(`box-${row + 1}x${column}`)?.classList.remove("box-available");
        result++;
      }
    }

    return result;
  }
}
