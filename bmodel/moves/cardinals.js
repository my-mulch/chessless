import { bot, left, generateMap, right, top } from './utils';
import { countBits, getBit, indexOf, SQUARES } from '../game/utils.js';

export const blockMaps = SQUARES.map(generateMap.bind(null, {
  moves: [noEdge(top), noEdge(bot), noEdge(left), noEdge(right)],
}));

export const attackMaps = SQUARES.map(generateMap.bind(null, {
  moves: [top, bot, left, right],
}));

export function getCardinalMoveMapFromBlockMap(square, blockMap) {
  return generateMap({
    moves: [
      (r, f, board) => top(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
      (r, f, board) => bot(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
      (r, f, board) => left(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
      (r, f, board) => right(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
    ],
  }, square);
}

export const numCardinalBlockingBits = blockMaps.map(countBits);
