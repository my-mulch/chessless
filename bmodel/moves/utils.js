import { clearBit, countBits, getBit, getLeastSignificantBit, setBit, indexOf, SQUARES } from '../game/utils.js';

export function getBlockMap(key, blockMap) {
  let blockers = 0n;

  const bits = countBits(blockMap);
  for (let bit = 0n; bit < bits; bit++) {
    const flipSquare = getLeastSignificantBit(blockMap);

    blockMap = clearBit(blockMap, flipSquare);

    if (getBit(key, bit)) { blockers = setBit(blockers, flipSquare); }
  }

  return blockers;
}

export function generateMap({ limit = 8, moves }, square) {
  const [rank, file] = rankAndFileOf(square);

  let board = 0n;
  const r = [], f = []; // runners by reference

  moves.forEach((move) => {
    r[0] = rank; c[0] = file;

    do { board = setBit(board, indexOf(r, f)); } while (limit-- && move(r, f, board));
  });

  return board;
}

export function generateMaps(moves, limit = 8) {
  return SQUARES.map(generateMap.bind(null, { moves, limit }));
}
