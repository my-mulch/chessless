/* eslint-disable one-var-declaration-per-line */
/* eslint-disable one-var */
/* eslint-disable no-bitwise */
/* eslint-disable no-restricted-syntax */

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function parseFEN(FEN = STARTING_FEN) {
  // Split FEN into constituent parts
  const [position, turn, castles] = FEN.split(' ');

  // Fill up the board with pieces
  let i = 0n;
  for (const square of position.replace(/\//g, '')) {
    const containsPiece = isNaN(square);

    if (containsPiece) { }

    i += containsPiece ? 1n : BigInt(square);
  }

  // Return the board and turn
  return [pieces, turn, castles];
}
