/* eslint-disable max-len */

import { printBoard } from '../game/utils.js';
import { generateMaps } from './utils.js';

// Stop short of the edge
export const ne = (move) => (r, f, b) => move(r, f, b, false);

// r: rank, f: file, b: current bitboard, e: all the way to edge
export const top = (r, f, b, e = true) => (e ? --r[0] >= 0 : --r[0] > 0);
export const bot = (r, f, b, e = true) => (e ? ++r[0] <= 7 : ++r[0] < 7);
export const left = (r, f, b, e = true) => (e ? --f[0] >= 0 : --f[0] > 0);
export const right = (r, f, b, e = true) => (e ? ++f[0] <= 7 : ++f[0] < 7);
export const topLeft = (r, f, b, e = true) => top(r, f, b, e) && left(r, f, b, e);
export const botLeft = (r, f, b, e = true) => bot(r, f, b, e) && left(r, f, b, e);
export const topRight = (r, f, b, e = true) => top(r, f, b, e) && right(r, f, b, e);
export const botRight = (r, f, b, e = true) => bot(r, f, b, e) && right(r, f, b, e);
export const topTopLeft = (r, f, b, e = true) => top(r, f, b, e) && top(r, f, b, e) && left(r, f, b, e);
export const botBotLeft = (r, f, b, e = true) => bot(r, f, b, e) && bot(r, f, b, e) && left(r, f, b, e);
export const topLeftLeft = (r, f, b, e = true) => top(r, f, b, e) && left(r, f, b, e) && left(r, f, b, e);
export const botLeftLeft = (r, f, b, e = true) => bot(r, f, b, e) && left(r, f, b, e) && left(r, f, b, e);
export const topTopRight = (r, f, b, e = true) => top(r, f, b, e) && top(r, f, b, e) && right(r, f, b, e);
export const botBotRight = (r, f, b, e = true) => bot(r, f, b, e) && bot(r, f, b, e) && right(r, f, b, e);
export const topRightRight = (r, f, b, e = true) => top(r, f, b, e) && right(r, f, b, e) && right(r, f, b, e);
export const botRightRight = (r, f, b, e = true) => bot(r, f, b, e) && right(r, f, b, e) && right(r, f, b, e);

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
export const bishopAttackMaps = generateMaps([botLeft, botRight, topLeft, topRight]);
export const bishopBlockMaps = generateMaps([ne(topLeft), ne(topRight), ne(botLeft), ne(botRight)]);

// ROOK TABLES
export const rookAttackMaps = generateMaps([top, bot, left, right]);
export const rookBlockMaps = generateMaps([ne(top), ne(bot), ne(left), ne(right)]);

printBoard(rookBlockMaps[10]);
