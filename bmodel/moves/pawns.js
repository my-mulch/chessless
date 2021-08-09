import { SQUARES } from '../game/utils';
import { moves } from './utils';

export const blackPawnAttackTable = SQUARES.map(moves.bind(null, {
  botLeft: (rr, cr) => ++rr[0] <= 7 && --cr[0] >= 0,
  botRight: (rr, cr) => ++rr[0] <= 7 && ++cr[0] <= 7,
}));

export const whitePawnAttackTable = SQUARES.map(moves.bind(null, {
  topLeft: (rr, cr) => --rr[0] >= 0 && --cr[0] >= 0,
  topRight: (rr, cr) => --rr[0] >= 0 && ++cr[0] <= 7,
}));
