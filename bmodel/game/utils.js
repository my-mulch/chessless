// FEN
export const WHITE = 'w', BLACK = 'b';
export const ROOK = 'r', WHITE_ROOK = 'R', BLACK_ROOK = 'r';
export const PAWN = 'p', WHITE_PAWN = 'P', BLACK_PAWN = 'p';
export const KING = 'k', WHITE_KING = 'K', BLACK_KING = 'k';
export const QUEEN = 'q', WHITE_QUEEN = 'Q', BLACK_QUEEN = 'q';
export const KNIGHT = 'n', WHITE_KNIGHT = 'N', BLACK_KNIGHT = 'n';
export const BISHOP = 'b', WHITE_BISHOP = 'B', BLACK_BISHOP = 'b';
export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export function getTeamFromFEN(piece) { return piece.toLowerCase() === piece ? BLACK : WHITE; }
export function getOtherTeamFEN(team) { return team === WHITE ? BLACK : WHITE; }
export function parseFEN(FEN = STARTING_FEN) {
  const [position, turn, castles] = FEN.split(' ');

  let i = 0n;
  for (const square of position.replace(/\//g, '')) {
    const containsPiece = isNaN(square);

    if (containsPiece) { }

    i += containsPiece ? 1n : BigInt(square);
  }

  // Return the board and turn
  return [pieces, turn, castles];
}

export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const SQUARES = [...new Array(64).keys()];

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

export function indexOf(r, c) {
  if (Array.isArray(r)) { return r[0] * 8 + c[0]; }

  return r * 8 + c;
}

export function rankAndFileOf(index) { return [Math.floor(index / 8), index % 8]; }

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
