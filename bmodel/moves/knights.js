import { createMoves } from './utils';

export const knightAttackTable = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r - 2; cr = c - 1; if (rr >= 0 && cr >= 0) { board[rr * 8 + cr] = 1; } // top top left
  rr = r - 2; cr = c + 1; if (rr >= 0 && cr < 8) { board[rr * 8 + cr] = 1; } // top top right
  rr = r - 1; cr = c + 2; if (rr >= 0 && cr < 8) { board[rr * 8 + cr] = 1; } // top right right
  rr = r - 1; cr = c - 2; if (rr >= 0 && cr >= 0) { board[rr * 8 + cr] = 1; } // top left left
  rr = r + 2; cr = c - 1; if (rr < 8 && cr >= 0) { board[rr * 8 + cr] = 1; } // bottom bottom left
  rr = r + 2; cr = c + 1; if (rr < 8 && cr < 8) { board[rr * 8 + cr] = 1; } // bottom bottom right
  rr = r + 1; cr = c + 2; if (rr < 8 && cr < 8) { board[rr * 8 + cr] = 1; } // bottom right right
  rr = r + 1; cr = c - 2; if (rr < 8 && cr >= 0) { board[rr * 8 + cr] = 1; } // bottom left left
});
