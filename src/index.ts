const SIZE = 8;

// eslint-disable-next-line @typescript-eslint/ban-types
const times = (n: number) => (f: Function) => {
  const iter = (i: number) => {
    if (i === n) return;
    f(i);
    iter(i + 1);
  };
  return iter(0);
};

function buildShortRow(rowIndex: number): HTMLElement {
  const row = document.createElement("div");
  row.classList.add("row-short");
  times(SIZE)((columnIndex: number) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.innerHTML = "&nbsp;";
    row.appendChild(dot);

    const line = document.createElement("div");
    line.classList.add("line-horizontal");
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

function buildTallRow(rowIndex: number): HTMLElement {
  const row = document.createElement("div");
  row.classList.add("row-tall");
  times(SIZE)((columnIndex: number) => {
    const line = document.createElement("div");
    line.classList.add("line-vertical");
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
  line.classList.add("line-vertical");
  line.dataset.position = `${rowIndex}x${SIZE + 1}`;
  line.innerHTML = "&nbsp;";
  row.appendChild(line);
  return row;
}

function init() {
  const gameField = document.getElementById("grid") as HTMLDivElement;

  times(SIZE * 2)((rowIndex: number) => {
    if (rowIndex % 2 == 0) {
      const row = buildShortRow(rowIndex);
      gameField.appendChild(row);
    } else {
      const row = buildTallRow(rowIndex);
      gameField.appendChild(row);
    }
  });

  const row = buildShortRow(SIZE * 2 + 1);
  gameField.appendChild(row);
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
