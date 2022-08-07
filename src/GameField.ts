import { DEFAULT_SIZE, times } from "./utils";

export class GameField {
  private size = DEFAULT_SIZE;

  constructor(private element: HTMLElement) {
    this.element = element;
  }

  reset(): void {
    this.element.innerHTML = "";
  }

  setup(size = DEFAULT_SIZE): void {
    this.size = size;

    times(this.size * 2)((rowIndex: number) => {
      if (rowIndex % 2 == 0) {
        const row = this.buildShortRow(rowIndex);
        this.element.appendChild(row);
      } else {
        const row = this.buildTallRow(rowIndex);
        this.element.appendChild(row);
      }
    });

    const row = this.buildShortRow(this.size * 2);
    this.element.appendChild(row);
  }

  buildShortRow(rowIndex: number): HTMLElement {
    const row = document.createElement("div");
    row.classList.add("row-short");
    times(this.size)((columnIndex: number) => {
      this.generateDot(row);
      this.generateLine(row, rowIndex, columnIndex, "horizontal");
    });
    this.generateDot(row);

    return row;
  }

  buildTallRow(rowIndex: number): HTMLElement {
    const row = document.createElement("div");
    row.classList.add("row-tall");
    times(this.size)((columnIndex: number) => {
      this.generateLine(row, rowIndex, columnIndex, "vertical");
      this.generateBox(row, rowIndex, columnIndex);
    });
    this.generateLine(row, rowIndex, this.size, "vertical");

    return row;
  }

  generateDot(parentElement: HTMLDivElement): void {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.innerHTML = "&nbsp;";
    parentElement.appendChild(dot);
  }

  generateBox(parentElement: HTMLDivElement, rowIndex: number, columnIndex: number): void {
    const box = document.createElement("div");
    box.classList.add("box", "box-available");
    box.id = `box-${rowIndex}x${columnIndex}`;
    box.dataset.row = rowIndex.toString();
    box.dataset.column = columnIndex.toString();
    box.innerHTML = "&nbsp;";
    parentElement.appendChild(box);
  }

  generateLine(parentElement: HTMLDivElement, rowIndex: number, columnIndex: number, type: string): void {
    const line = document.createElement("div");
    line.classList.add(`line-${type}`, "line", "line-available");
    line.id = `${type}-${rowIndex}x${columnIndex}`;
    line.dataset.row = rowIndex.toString();
    line.dataset.column = columnIndex.toString();
    line.innerHTML = "&nbsp;";
    parentElement.appendChild(line);
  }
}
