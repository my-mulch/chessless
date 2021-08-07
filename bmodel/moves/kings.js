import { createMoves } from './utils.js';

export const kingAttackTable = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r - 1; cr = c; if (rr >= 0) { board[rr * 8 + cr] = 1; } // top
  rr = r; cr = c - 1; if (cr >= 0) { board[rr * 8 + cr] = 1; } // left
  rr = r; cr = c + 1; if (cr < 8) { board[rr * 8 + cr] = 1; } // right
  rr = r + 1; cr = c; if (rr < 8) { board[rr * 8 + cr] = 1; } // bottom
  rr = r - 1; cr = c - 1; if (rr >= 0 && cr >= 0) { board[rr * 8 + cr] = 1; } // top left
  rr = r - 1; cr = c + 1; if (rr >= 0 && cr < 8) { board[rr * 8 + cr] = 1; } // top right
  rr = r + 1; cr = c - 1; if (rr < 8 && cr >= 0) { board[rr * 8 + cr] = 1; } // bottom left
  rr = r + 1; cr = c + 1; if (rr < 8 && cr < 8) { board[rr * 8 + cr] = 1; } // bottom right
});
