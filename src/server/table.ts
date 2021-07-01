import chalk from "chalk";
import { stdout } from "process";

const TOP_RIGHT = "╮";
const TOP_LEFT = "╭";
const BOTTOM_RIGHT = "╯";
const BOTTOM_LEFT = "╰";
const VERTICAL_LINE = "│";
const HORIZONTAL_LINE = "─";
const JUNCTION_RIGHT = "├";
const JUNCTION_LEFT = "┤";
const JUNCTION_UP = "┴";
const JUNCTION_DOWN = "┬";
const JUNCTION_CROSS = "┼";
const NEWLINE = "\n";
const SPACE = " ";

const ANSI_REGEX = /\x1B\[(([0-9]{1,2})?(;)?([0-9]{1,2})?)?[m,K,H,f,J]/g;
const strip_formatting = (s: string) => s.replace(ANSI_REGEX, "");
const width = () => process.stdout.columns - 12;
const len = (s: string) => strip_formatting(s).length;

const gen_header = (text: string): string => {
  let header = `${TOP_LEFT}${HORIZONTAL_LINE.repeat(width())}${TOP_RIGHT}`;
  header += "\n";
  header += `│ ${text.padEnd(width() - 2, " ")} │`;
  header += "\n";
  return header;
};

const gen_thead = (cols: Array<{ title: string; len: number }>) => {
  // Print top line
  let row = JUNCTION_RIGHT;
  for (const col of cols.take(cols.length - 1)) {
    row += HORIZONTAL_LINE.repeat(col.len + 2);
    row += JUNCTION_DOWN;
  }
  const last_cell_len =
    width() -
    1 -
    cols.take(cols.length - 1).reduce((total, col) => total + col.len + 2, 0);
  row += HORIZONTAL_LINE.repeat(last_cell_len);
  row += JUNCTION_LEFT;
  row += NEWLINE;

  // Print title line
  row += VERTICAL_LINE;
  for (const col of cols.take(cols.length - 1)) {
    row += ` ${col.title.toLocaleUpperCase()} `;
    row += SPACE.repeat(col.len - len(col.title));
    row += VERTICAL_LINE;
  }

  row += ` ${cols.last().title.toLocaleUpperCase()} `;
  row += SPACE.repeat(last_cell_len - len(cols.last().title) - 2);
  row += VERTICAL_LINE;
  row += NEWLINE;

  // Print bottom line
  row += JUNCTION_RIGHT;
  for (const col of cols.take(cols.length - 1)) {
    row += HORIZONTAL_LINE.repeat(col.len + 2);
    row += JUNCTION_CROSS;
  }
  row += HORIZONTAL_LINE.repeat(last_cell_len);
  row += JUNCTION_LEFT;
  row += NEWLINE;

  return row;
};

const gen_trow = (cols: Array<{ title: string; len: number }>) => {
  // Print top line
  // let row = JUNCTION_RIGHT;
  // for (const col of cols.take(cols.length - 1)) {
  //   row += HORIZONTAL_LINE.repeat(col.len + 2);
  //   row += JUNCTION_DOWN;
  // }

  // row += HORIZONTAL_LINE.repeat(last_cell_len);
  // row += JUNCTION_LEFT;
  // row += NEWLINE;

  // Print title line
  let row = VERTICAL_LINE;
  for (const col of cols.take(cols.length - 1)) {
    row += ` ${col.title} `;
    row += SPACE.repeat(col.len - len(col.title));
    row += VERTICAL_LINE;
  }
  const last_cell_len =
    width() -
    1 -
    cols.take(cols.length - 1).reduce((total, col) => total + col.len + 2, 0);
  row += ` ${cols.last().title} `;
  row += SPACE.repeat(last_cell_len - len(cols.last().title) - 2);
  row += VERTICAL_LINE;
  row += NEWLINE;

  // // Print bottom line
  // row += JUNCTION_RIGHT;
  // for (const col of cols.take(cols.length - 1)) {
  //   row += HORIZONTAL_LINE.repeat(col.len + 2);
  //   row += JUNCTION_CROSS;
  // }
  // row += HORIZONTAL_LINE.repeat(last_cell_len);
  // row += JUNCTION_LEFT;
  // row += NEWLINE;

  return row;
};

export const print_table = <T>(
  header_text: string,
  columns: Array<string>,
  data: Array<T>,
) => {
  const col_width = columns.reduce((acc: any, col) => {
    acc[col] = len(col);
    return acc;
  }, {});
  for (const row of data) {
    for (const [key, val] of Object.entries(row)) {
      col_width[key] = Math.max(col_width[key], len(String(val)));
    }
  }
  const column_cells = columns.map((e) => ({ title: e, len: col_width[e] }));

  process.stdout.write(gen_header(header_text));
  process.stdout.write(gen_thead(column_cells));
  for (const row of data) {
    const cells = Object.entries(row).map(([k, v]) => ({
      title: v,
      len: col_width[k],
    }));
    process.stdout.write(gen_trow(cells));
  }

  // Print bottom line
  let table_end = BOTTOM_LEFT;
  for (const col of column_cells.take(column_cells.length - 1)) {
    table_end += HORIZONTAL_LINE.repeat(col.len + 2);
    table_end += JUNCTION_UP;
  }
  const last_cell_len =
    width() -
    1 -
    column_cells
      .take(column_cells.length - 1)
      .reduce((total, col) => total + col.len + 2, 0);
  table_end += HORIZONTAL_LINE.repeat(last_cell_len);
  table_end += BOTTOM_RIGHT;
  table_end += NEWLINE;

  process.stdout.write(table_end);
};
