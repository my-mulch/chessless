/* eslint-disable max-len */
import { getBit, indexOf } from '../game/utils.js';
import { generateMap, generateMaps } from './utils.js';

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

// KING TABLES
export const kingAttackTable = generateMaps([
  top, bot, left, right, topLeft, botLeft, topRight, botRight,
], 1);

// KNIGHT TABLES
export const knightAttackTable = generateMaps([
  topTopLeft, botBotLeft, topLeftLeft, botLeftLeft,
  topTopRight, botBotRight, topRightRight, botRightRight,
], 1);

// PAWN TABLES
export const blackPawnAttackTable = generateMaps([botLeft, botRight], 1);
export const whitePawnAttackTable = generateMaps([topLeft, topRight], 1);

// BISHOP TABLES
export const bishopAttackMapsEmpty = generateMaps([botLeft, botRight, topLeft, topRight]);
export const bishopAttackMapsBlock = generateMaps([ne(topLeft), ne(topRight), ne(botLeft), ne(botRight)]);
export const generateBishopAttackMapFromBlockMap = (square, blockMap) => generateMap({
  moves: [wb(topLeft, blockMap), wb(topRight, blockMap), wb(botLeft, blockMap), wb(botRight, blockMap)],
}, square);

// ROOK TABLES
export const rookAttackMapsEmpty = generateMaps([top, bot, left, right]);
export const rookAttackMapsBlock = generateMaps([ne(top), ne(bot), ne(left), ne(right)]);
export const generateRookAttackMapFromBlockMap = (square, blockMap) => generateMap({
  moves: [wb(top, blockMap), wb(bot, blockMap), wb(left, blockMap), wb(right, blockMap)],
}, square);
