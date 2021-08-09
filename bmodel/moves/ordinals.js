import { botLeft, botRight, generateMap, noEdge, topLeft, topRight } from './utils';
import { countBits, getBit, indexOf, SQUARES } from '../game/utils.js';

export const blockMaps = SQUARES.map(generateMap.bind(null, {
  moves: [noEdge(topLeft), noEdge(topRight), noEdge(botLeft), noEdge(botRight)],
}));

export const attackMaps = SQUARES.map(moves.bind(null, {
  moves: [botLeft, botRight, topLeft, topRight],
}));

export function getOrdinalMoveMapFromBlockMap(square, blockMap) {
  return generateMap({
    moves: [
      (r, f, board) => topLeft(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
      (r, f, board) => botLeft(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
      (r, f, board) => topRight(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
      (r, f, board) => botRight(true, r, f) && !(getBit(board, indexOf(r, f)) & blockMap),
    ],
  }, square);
}

export const numOrdinalBlockingBits = blockMaps.map(countBits);
