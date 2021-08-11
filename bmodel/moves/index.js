/* eslint-disable max-len */
import { clearBit, printBoard } from '../game/utils.js';
import {
  ne, // modifiers
  top, left, bot, right, // cardinals
  botLeft, botRight, topLeft, topRight, // ordinals
  topTopLeft, topTopRight, botBotLeft, botBotRight, // knights
  topLeftLeft, topRightRight, botLeftLeft, botRightRight,
  generateAttackMaps, attackMapFromBlockMapGenerator, // mappers
} from './utils.js';

// KING TABLES
export const kingAttackTable = generateAttackMaps([
  top, bot, left, right, topLeft, botLeft, topRight, botRight,
], 1);

// KNIGHT TABLES
export const knightAttackTable = generateAttackMaps([
  topTopLeft, botBotLeft, topLeftLeft, botLeftLeft,
  topTopRight, botBotRight, topRightRight, botRightRight,
], 1);

// PAWN TABLES
export const blackPawnAttackTable = generateAttackMaps([botLeft, botRight], 1);
export const whitePawnAttackTable = generateAttackMaps([topLeft, topRight], 1);

// BISHOP TABLES
export const bishopAttackMapsEmpty = generateAttackMaps([botLeft, botRight, topLeft, topRight]);
export const bishopAttackMapsBlock = generateAttackMaps([ne(topLeft), ne(topRight), ne(botLeft), ne(botRight)]);
export const generateBishopAttackMapFromBlockMap = attackMapFromBlockMapGenerator([topLeft, topRight, botLeft, botRight]);

// ROOK TABLES
export const rookAttackMapsEmpty = generateAttackMaps([top, bot, left, right]);
export const rookAttackMapsBlock = generateAttackMaps([ne(top), ne(bot), ne(left), ne(right)]);
export const generateRookAttackMapFromBlockMap = attackMapFromBlockMapGenerator([top, bot, left, right]);
