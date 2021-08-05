/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */

import { arrayToBitBoard } from './utils.js';

export function createMoves(func) {
  return Object.fromEntries(new Array(64).fill(0).map((_, i) => {
    // index of this bitboard
    const index = 1n << BigInt(i);

    // starting row and column
    const r = Math.floor(i / 8); const c = i % 8;

    // new board
    const board = new Array(64).fill(0); board[i] = 1;

    // create the potential moves on the board
    func(board, r, c);

    // return the moves as an integer, indexed by the position of the piece
    return [index, arrayToBitBoard(board)];
  }));
}

export const cardinals = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r; cr = c; while (--rr >= 0) { board[rr * 8 + cr] = 1; } // top
  rr = r; cr = c; while (--cr >= 0) { board[rr * 8 + cr] = 1; } // left
  rr = r; cr = c; while (++cr < 8) { board[rr * 8 + cr] = 1; } // right
  rr = r; cr = c; while (++rr < 8) { board[rr * 8 + cr] = 1; } // bottom
});

export const diagonals = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r; cr = c; while (--rr >= 0 && --cr >= 0) { board[rr * 8 + cr] = 1; } // top left
  rr = r; cr = c; while (++rr < 8 && --cr >= 0) { board[rr * 8 + cr] = 1; } // bottom left
  rr = r; cr = c; while (--rr >= 0 && ++cr < 8) { board[rr * 8 + cr] = 1; } // top right
  rr = r; cr = c; while (++rr < 8 && ++cr < 8) { board[rr * 8 + cr] = 1; } // bottom right
});

export const knights = createMoves((board, r, c) => {
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

export const kings = createMoves((board, r, c) => {
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

export const blackPawns = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r + 1; cr = c; if (rr < 8) { board[rr * 8 + cr] = 1; } // push
  rr = r + 2; cr = c; if (r === 1) { board[rr * 8 + cr] = 1; } // double push
  rr = r + 1; cr = c + 1; if (rr < 8 && cr < 8) { board[rr * 8 + cr] = 1; } // capture left
  rr = r + 1; cr = c - 1; if (rr < 8 && cr >= 0) { board[rr * 8 + cr] = 1; } // capture right
});

export const whitePawns = createMoves((board, r, c) => {
  let rr; let cr;
  rr = r - 1; cr = c; if (rr >= 0) { board[rr * 8 + cr] = 1; } // push
  rr = r - 2; cr = c; if (r === 6) { board[rr * 8 + cr] = 1; } // double push
  rr = r - 1; cr = c + 1; if (rr >= 0 && cr < 8) { board[rr * 8 + cr] = 1; } // capture left
  rr = r - 1; cr = c - 1; if (rr >= 0 && cr >= 0) { board[rr * 8 + cr] = 1; } // capture right
});

export const queens = Object.fromEntries(
  Object.entries(cardinals).map(([index]) => [index, cardinals[index] | diagonals[index]]),
);

export const checks = Object.fromEntries(
  Object.entries(queens).map(([index]) => [index, knights[index] | queens[index]]),
);
