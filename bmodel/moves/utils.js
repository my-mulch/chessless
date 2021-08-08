import { arrayToBitBoard, clearBit, countBits, getBit, getLeastSignificantBit, setBit } from '../game/utils.js';

export function getBlockers(blockerMap, key) {
  let blockers = 0n;

  const bits = countBits(blockerMap);
  for (let bit = 0n; bit < bits; bit++) {
    const flipSquare = getLeastSignificantBit(blockerMap);

    blockerMap = clearBit(blockerMap, flipSquare);

    if (getBit(key, bit)) { blockers = setBit(blockers, flipSquare); }
  }

  return blockers;
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
