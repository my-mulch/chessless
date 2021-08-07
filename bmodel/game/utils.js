// FEN
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
export const a8 = 0, b8 = 1, c8 = 2, d8 = 3, e8 = 4, f8 = 5, g8 = 6, h8 = 7;
export const a7 = 8, b7 = 9, c7 = 10, d7 = 11, e7 = 12, f7 = 13, g7 = 14, h7 = 15;
export const a6 = 16, b6 = 17, c6 = 18, d6 = 19, e6 = 20, f6 = 21, g6 = 22, h6 = 23;
export const a5 = 24, b5 = 25, c5 = 26, d5 = 27, e5 = 28, f5 = 29, g5 = 30, h5 = 31;
export const a4 = 32, b4 = 33, c4 = 34, d4 = 35, e4 = 36, f4 = 37, g4 = 38, h4 = 39;
export const a3 = 40, b3 = 41, c3 = 42, d3 = 43, e3 = 44, f3 = 45, g3 = 46, h3 = 47;
export const a2 = 48, b2 = 49, c2 = 50, d2 = 51, e2 = 52, f2 = 53, g2 = 54, h2 = 55;
export const a1 = 56, b1 = 57, c1 = 58, d1 = 59, e1 = 60, f1 = 61, g1 = 62, h1 = 63;

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
