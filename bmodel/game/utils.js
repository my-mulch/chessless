// FEN
export const WHITE = 'w', BLACK = 'b';
export const ROOK = 'r', WHITE_ROOK = 'R', BLACK_ROOK = 'r';
export const PAWN = 'p', WHITE_PAWN = 'P', BLACK_PAWN = 'p';
export const KING = 'k', WHITE_KING = 'K', BLACK_KING = 'k';
export const QUEEN = 'q', WHITE_QUEEN = 'Q', BLACK_QUEEN = 'q';
export const KNIGHT = 'n', WHITE_KNIGHT = 'N', BLACK_KNIGHT = 'n';
export const BISHOP = 'b', WHITE_BISHOP = 'B', BLACK_BISHOP = 'b';
export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const getTeamFromFEN = (piece) => (piece.toLowerCase() === piece ? BLACK : WHITE);
export const getOtherTeamFEN = (team) => (team === WHITE ? BLACK : WHITE);

export const parseFEN = (FEN = STARTING_FEN) => {
  const [position, turn, castles] = FEN.split(' ');

  let i = 0n;
  for (const square of position.replace(/\//g, '')) {
    const containsPiece = isNaN(square);

    if (containsPiece) { }

    i += containsPiece ? 1n : BigInt(square);
  }

  // Return the board and turn
  return [pieces, turn, castles];
};

export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1].map(BigInt);
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const SQUARES = [...new Array(64).keys()].map(BigInt);

export const printBoard = (board) => {
  const string = board
    .toString(2).padStart(64, 0).split('').reverse().join('') // reverse binary string
    .match(/.{1,8}/g).map((row, i) => `${RANKS[i]}    ${row.split('').join(' ')}`) // split into groups of 8 bits and lay them out
    .concat(`\n     ${FILES.join(' ')}     ${board}\n`).join('\n'); // print the footer and add new lines

  console.log(`\n${string}`);
};

export const rankAndFileOf = (index) => [index / 8n, index % 8n];
export const indexOf = (r, f) => (Array.isArray(r) ? r[0n] * 8n + f[0n] : r * 8n + f);

// board, square
export const getBit = (b, s) => b & (1n << s);
export const setBit = (b, s) => b |= (1n << s);
export const getLSB = (b) => countBits((b & -b) - 1n);
export const clearBit = (b, s) => (getBit(b, s) ? (b ^= (1n << s)) : b);
export const countBits = (b) => { let c = 0n; while (b) { c++; b &= b - 1n; } return c; };
