export function render(
  document: Document,
  lsv: number[],
  rsv: number[],
  result: number[]
) {
  const lsvTable = document.querySelector<HTMLTableElement>('#lsv');
  const rsvTable = document.querySelector<HTMLTableElement>('#rsv');
  const resultTable = document.querySelector<HTMLTableElement>('#result');

  renderTable(lsvTable, lsv);
  renderTable(rsvTable, rsv);
  renderTable(resultTable, result);
}

function renderTable(table: HTMLTableElement, values: number[]) {
  table.querySelectorAll('tbody td').forEach((td, i) => {
    td.textContent = String(values[i]);
  });
}
