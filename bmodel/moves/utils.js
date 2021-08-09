import { clearBit, countBits, getBit, getLeastSignificantBit, setBit, indexOf } from '../game/utils.js';

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

// e: all the way to edge
export function noEdge(move) { return move.bind(null, false); }
export const top = (e = true, r, f) => (e ? --r[0] >= 0 : --r[0] > 0);
export const bot = (e = true, r, f) => (e ? ++r[0] <= 7 : ++r[0] < 7);
export const left = (e = true, r, f) => (e ? --f[0] >= 0 : --f[0] > 0);
export const right = (e = true, r, f) => (e ? ++f[0] <= 7 : ++f[0] < 7);
export const topLeft = (e, r, f) => top(e, r, f) && left(e, r, f);
export const botLeft = (e, r, f) => bot(e, r, f) && left(e, r, f);
export const topRight = (e, r, f) => top(e, r, f) && right(e, r, f);
export const botRight = (e, r, f) => bot(e, r, f) && right(e, r, f);
export const topTopLeft = (e, r, f) => top(e, r, f) && top(e, r, f) && left(e, r, f);
export const botBotLeft = (e, r, f) => bot(e, r, f) && bot(e, r, f) && left(e, r, f);
export const topLeftLeft = (e, r, f) => top(e, r, f) && left(e, r, f) && left(e, r, f);
export const botLeftLeft = (e, r, f) => bot(e, r, f) && left(e, r, f) && left(e, r, f);
export const topTopRight = (e, r, f) => top(e, r, f) && top(e, r, f) && right(e, r, f);
export const botBotRight = (e, r, f) => bot(e, r, f) && bot(e, r, f) && right(e, r, f);
export const topRightRight = (e, r, f) => top(e, r, f) && right(e, r, f) && right(e, r, f);
export const botRightRight = (e, r, f) => bot(e, r, f) && right(e, r, f) && right(e, r, f);
