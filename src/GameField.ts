import { times, SIZE } from "./utils";

export class GameField {
  constructor(private element: HTMLElement) {
    this.element = element;
  }

  setup(): void {
    times(SIZE * 2)((rowIndex: number) => {
      if (rowIndex % 2 == 0) {
        const row = this.buildShortRow(rowIndex);
        this.element.appendChild(row);
      } else {
        const row = this.buildTallRow(rowIndex);
        this.element.appendChild(row);
      }
    });

    const row = this.buildShortRow(SIZE * 2 + 1);
    this.element.appendChild(row);
  }

  buildShortRow(rowIndex: number): HTMLElement {
    const row = document.createElement("div");
    row.classList.add("row-short");
    times(SIZE)((columnIndex: number) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.innerHTML = "&nbsp;";
      row.appendChild(dot);

      const line = document.createElement("div");
      line.classList.add("line-horizontal", "line", "line-available");
      line.dataset.position = `${rowIndex}x${columnIndex}`;
      line.dataset.row = rowIndex.toString();
      line.dataset.column = columnIndex.toString();
      line.innerHTML = "&nbsp;";
      row.appendChild(line);
    });
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.innerHTML = "&nbsp;";
    row.appendChild(dot);
    return row;
  }

  buildTallRow(rowIndex: number): HTMLElement {
    const row = document.createElement("div");
    row.classList.add("row-tall");
    times(SIZE)((columnIndex: number) => {
      const line = document.createElement("div");
      line.classList.add("line-vertical", "line", "line-available");
      line.dataset.position = `${rowIndex}x${columnIndex}`;
      line.dataset.row = rowIndex.toString();
      line.dataset.column = columnIndex.toString();
      line.innerHTML = "&nbsp;";
      row.appendChild(line);

      const box = document.createElement("div");
      box.classList.add("box");
      box.dataset.position = `${rowIndex}x${columnIndex}`;
      box.dataset.row = rowIndex.toString();
      box.dataset.column = columnIndex.toString();
      box.innerHTML = "&nbsp;";
      row.appendChild(box);
    });
    const line = document.createElement("div");
    line.classList.add("line-vertical", "line", "line-available");
    line.dataset.position = `${rowIndex}x${SIZE + 1}`;
    line.innerHTML = "&nbsp;";
    row.appendChild(line);
    return row;
  }
}
