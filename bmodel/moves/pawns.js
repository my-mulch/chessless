import { createMoves } from './utils';

export const blackPawns = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r + 1; cr = c + 1; if (rr < 8 && cr < 8) { board[rr * 8 + cr] = 1; } // capture left
  rr = r + 1; cr = c - 1; if (rr < 8 && cr >= 0) { board[rr * 8 + cr] = 1; } // capture right
});

export const whitePawns = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r - 1; cr = c + 1; if (rr >= 0 && cr < 8) { board[rr * 8 + cr] = 1; } // capture left
  rr = r - 1; cr = c - 1; if (rr >= 0 && cr >= 0) { board[rr * 8 + cr] = 1; } // capture right
});
