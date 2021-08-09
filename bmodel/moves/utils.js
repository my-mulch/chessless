import {
  clearBit, countBits, getBit, getLSB, setBit, SQUARES, rankAndFileOf, indexOf,
} from '../game/utils.js';

export const generateBlockMap = (key, attackMap) => {
  let blockMap = 0n;

  const bits = countBits(attackMap);
  for (let bit = 0n; bit < bits; bit++) {
    const flipSquare = getLSB(attackMap);

    attackMap = clearBit(attackMap, flipSquare);

    if (getBit(key, bit)) { blockMap = setBit(blockMap, flipSquare); }
  }

  return blockMap;
};

export const generateMap = ({ limit = 8n, moves }, square) => {
  const [rank, file] = rankAndFileOf(square);

  let board = 0n, l;
  const r = [], f = []; // runners by reference

  moves.forEach((move) => {
    r[0] = rank; f[0] = file; l = limit;

    while (l-- && move(r, f, board)) {
      board = setBit(board, indexOf(r, f));
    }
  });

  return board;
};

export const generateMaps = (moves, limit = 8) => (
  SQUARES.map(generateMap.bind(null, { moves, limit }))
);
