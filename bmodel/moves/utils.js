export function arrayToBitBoard(array) {
  return BigInt(`0b${array.join('')}`);
}

export function countBits(board) {
  let count = 0n;

  while (board) { count += board & 1n; board >>= 1n; }

  return Number(count);
}

export function printBitBoard(board) {
  console.log(
    board
      .toString(2).padStart(64, 0) // to binary
      .split('').reverse().join('') // reverse the string
      .match(/.{1,8}/g) // split into groups of 8 bits
      .map((row) => row.split('').join(' ')).join('\n'), // create the board string
  );
}

export function createMoves(func) {
  return new Array(64).fill(0).map((_, i) => {
    // starting row and column
    const r = Math.floor(i / 8); const c = i % 8;

    // new board
    const board = new Array(64).fill(0);

    // create the potential moves on the board
    func(board, r, c);

    // return the moves as an integer, indexed by the position of the piece
    return arrayToBitBoard(board);
  });
}
