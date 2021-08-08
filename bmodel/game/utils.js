// FEN
export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const WHITE = 'w', BLACK = 'b';
export const ROOK = 'r', WHITE_ROOK = 'R', BLACK_ROOK = 'r';
export const PAWN = 'p', WHITE_PAWN = 'P', BLACK_PAWN = 'p';
export const KING = 'k', WHITE_KING = 'K', BLACK_KING = 'k';
export const QUEEN = 'q', WHITE_QUEEN = 'Q', BLACK_QUEEN = 'q';
export const KNIGHT = 'n', WHITE_KNIGHT = 'N', BLACK_KNIGHT = 'n';
export const BISHOP = 'b', WHITE_BISHOP = 'B', BLACK_BISHOP = 'b';

export function getTeamFromFEN(piece) { return piece.toLowerCase() === piece ? BLACK : WHITE; }
export function getOtherTeamFEN(team) { return team === WHITE ? BLACK : WHITE; }

// Squares
export const a8 = 0n, b8 = 1n, c8 = 2n, d8 = 3n, e8 = 4n, f8 = 5n, g8 = 6n, h8 = 7n;
export const a7 = 8n, b7 = 9n, c7 = 10n, d7 = 11n, e7 = 12n, f7 = 13n, g7 = 14n, h7 = 15n;
export const a6 = 16n, b6 = 17n, c6 = 18n, d6 = 19n, e6 = 20n, f6 = 21n, g6 = 22n, h6 = 23n;
export const a5 = 24n, b5 = 25n, c5 = 26n, d5 = 27n, e5 = 28n, f5 = 29n, g5 = 30n, h5 = 31n;
export const a4 = 32n, b4 = 33n, c4 = 34n, d4 = 35n, e4 = 36n, f4 = 37n, g4 = 38n, h4 = 39n;
export const a3 = 40n, b3 = 41n, c3 = 42n, d3 = 43n, e3 = 44n, f3 = 45n, g3 = 46n, h3 = 47n;
export const a2 = 48n, b2 = 49n, c2 = 50n, d2 = 51n, e2 = 52n, f2 = 53n, g2 = 54n, h2 = 55n;
export const a1 = 56n, b1 = 57n, c1 = 58n, d1 = 59n, e1 = 60n, f1 = 61n, g1 = 62n, h1 = 63n;

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

export function printBitBoard(board) {
  console.log(
    `\n${board
      .toString(2).padStart(64, 0) // to binary
      .split('').reverse().join('') // reverse the string
      .match(/.{1,8}/g) // split into groups of 8 bits
      .map((row, i) => `${RANKS[i]}    ${row.split('').join(' ')}`) // print the bits
      .concat(`\n     ${FILES.join(' ')}     ${board}\n`) // print the footer
      .join('\n')}`,
  );
}

export function arrayToBitBoard(array) {
  return BigInt(`0b${array.join('')}`);
}

export function countBits(board) {
  let count = 0n;

  while (board) { count += board & 1n; board >>= 1n; }

  return count;
}

// board, square
export function setBit(b, s) { return b |= (1n << s); }
export function getBit(b, s) { return b & (1n << s); }
export function clearBit(b, s) { return getBit(b, s) ? (b ^= (1n << s)) : b; }
export function getLeastSignificantBit(b) { return countBits((b & -b) - 1n); }
