import { countBits, createMoves } from './utils.js';

export const cardinalAttackMap = createMoves((board, r, c) => {
  let rr, cr;
  rr = r; cr = c; while (--rr >= 0) { board[rr * 8 + cr] = 1; } // top
  rr = r; cr = c; while (--cr >= 0) { board[rr * 8 + cr] = 1; } // left
  rr = r; cr = c; while (++cr <= 7) { board[rr * 8 + cr] = 1; } // right
  rr = r; cr = c; while (++rr <= 7) { board[rr * 8 + cr] = 1; } // bottom
});

export const cardinalBlockerMap = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r; cr = c; while (--rr > 0) { board[rr * 8 + cr] = 1; } // top
  rr = r; cr = c; while (--cr > 0) { board[rr * 8 + cr] = 1; } // left
  rr = r; cr = c; while (++cr < 7) { board[rr * 8 + cr] = 1; } // right
  rr = r; cr = c; while (++rr < 7) { board[rr * 8 + cr] = 1; } // bottom
});

export const numCardinalBlockingBits = cardinalBlockerMap.map(countBits);
