export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export function parseFEN(FEN) {
  // Split FEN into constituent parts
  const [position, turn, castles, enpassant] = FEN.split(' ');

  // Create the board
  const board = new Array(64).fill(null);

  // Fill up the board with pieces
  let i = 0;
  for (const square of position.replace(/\//g, '')) {
    const containsPiece = isNaN(square);

    if (containsPiece) board[i] = square;

    i += containsPiece ? 1 : +square;
  }

  // Return the board and turn
  return [board, turn, castles, convertFromAlgebraic(enpassant)];
}

export function convertToAlgebraic(index) {
  const [rank, file] = rankAndFileOf(index);

  return FILES[file] + RANKS[rank];
}

export function convertFromAlgebraic(square) {
  const [file, rank] = square;

  return indexOf(8 - +rank, file.toLowerCase().charCodeAt() - 97);
}

export function rankAndFileOf(index) {
  return [Math.floor(index / 8), index % 8];
}

export function indexOf(rank, file) {
  if (rank < 0 || rank >= 8 || file < 0 || file >= 8) return undefined;

  return rank * 8 + file;
}
