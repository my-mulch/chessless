export function arrayToBitBoard(array) {
  return BigInt(`0b${array.join('')}`);
}

export function countBits(board) {
  let count = 0n;

  while (board) { count += board & 1n; board >>= 1n; }

  return Number(count);
}

export function createMoves(func) {
  return new Array(64).fill(0).map((_, i) => {
    // starting row and column
    const r = 7 - Math.floor(i / 8); const c = 7 - (i % 8);

    // new board
    const board = new Array(64).fill(0);

    // create the potential moves on the board
    func(board, r, c);

    // return the moves as an integer, indexed by the position of the piece
    return arrayToBitBoard(board);
  });
}
