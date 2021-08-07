import { d6, e4, printBitBoard } from '../game/utils.js';
import { countBits, createMoves } from './utils.js';

export const diagonalAttackMap = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r; cr = c; while (--rr >= 0 && --cr >= 0) { board[rr * 8 + cr] = 1; } // top left
  rr = r; cr = c; while (++rr <= 7 && --cr >= 0) { board[rr * 8 + cr] = 1; } // bottom left
  rr = r; cr = c; while (--rr >= 0 && ++cr <= 7) { board[rr * 8 + cr] = 1; } // top right
  rr = r; cr = c; while (++rr <= 7 && ++cr <= 7) { board[rr * 8 + cr] = 1; } // bottom right
});

export const diagonalBlockerMap = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r; cr = c; while (--rr > 0 && --cr > 0) { board[rr * 8 + cr] = 1; } // top left
  rr = r; cr = c; while (++rr < 7 && --cr > 0) { board[rr * 8 + cr] = 1; } // bottom left
  rr = r; cr = c; while (--rr > 0 && ++cr < 7) { board[rr * 8 + cr] = 1; } // top right
  rr = r; cr = c; while (++rr < 7 && ++cr < 7) { board[rr * 8 + cr] = 1; } // bottom right
});

export const numDiagonalBlockingBits = diagonalBlockerMap.map(countBits);

export function diagonalBlockers(square, key) {
  printBitBoard(diagonalBlockerMap[square]);
}

diagonalBlockers(e4);
