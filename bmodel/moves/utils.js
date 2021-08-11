import {
  clearBit, countBits, getBit, getLSB, setBit, SQUARES, rankAndFileOf, indexOf,
} from '../game/utils.js';

// Stop short of the edge
export const ne = (move) => (r, f) => move(r, f, false);

// Stop moves if blocked
export const wb = (move, blockMap) => (r, f) => !getBit(blockMap, indexOf(r, f)) && move(r, f);

// r: rank, f: file, b: current bitboard, e: all the way to edge
export const top = (r, f, e = true) => (e ? --r[0] >= 0 : --r[0] > 0);
export const bot = (r, f, e = true) => (e ? ++r[0] <= 7 : ++r[0] < 7);
export const left = (r, f, e = true) => (e ? --f[0] >= 0 : --f[0] > 0);
export const right = (r, f, e = true) => (e ? ++f[0] <= 7 : ++f[0] < 7);
export const topLeft = (r, f, e = true) => top(r, f, e) && left(r, f, e);
export const botLeft = (r, f, e = true) => bot(r, f, e) && left(r, f, e);
export const topRight = (r, f, e = true) => top(r, f, e) && right(r, f, e);
export const botRight = (r, f, e = true) => bot(r, f, e) && right(r, f, e);
export const topTopLeft = (r, f, e = true) => top(r, f, e) && top(r, f, e) && left(r, f, e);
export const botBotLeft = (r, f, e = true) => bot(r, f, e) && bot(r, f, e) && left(r, f, e);
export const topLeftLeft = (r, f, e = true) => top(r, f, e) && left(r, f, e) && left(r, f, e);
export const botLeftLeft = (r, f, e = true) => bot(r, f, e) && left(r, f, e) && left(r, f, e);
export const topTopRight = (r, f, e = true) => top(r, f, e) && top(r, f, e) && right(r, f, e);
export const botBotRight = (r, f, e = true) => bot(r, f, e) && bot(r, f, e) && right(r, f, e);
export const topRightRight = (r, f, e = true) => top(r, f, e) && right(r, f, e) && right(r, f, e);
export const botRightRight = (r, f, e = true) => bot(r, f, e) && right(r, f, e) && right(r, f, e);

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

export const generateAttackMap = ({ limit = 8n, moves }, square) => {
  const [rank, file] = rankAndFileOf(square);

  let board = 0n, l;
  const r = [], f = []; // runners by reference

  moves.forEach((move) => {
    r[0] = rank; f[0] = file; l = limit;

    while (l-- && move(r, f)) {
      board = setBit(board, indexOf(r, f));
    }
  });

  return board;
};

export const generateAttackMaps = (moves, limit = 8) => (
  SQUARES.map(generateAttackMap.bind(null, { moves, limit }))
);

export const attackMapFromBlockMapGenerator = (moves) => (square, blockMap) => generateAttackMap({
  moves: moves.map((move) => wb(move, blockMap)),
}, square);
