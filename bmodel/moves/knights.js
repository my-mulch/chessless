import { moves } from './utils';

export const knightAttackTable = [...new Array(64).keys()].map(moves.bind(null, {
  topTopLeft: (rr, cr) => rr >= 0 && cr >= 0,
  botBotLeft: (rr, cr) => rr <= 7 && cr >= 0,
  topLeftLeft: (rr, cr) => rr >= 0 && cr >= 0,
  botLeftLeft: (rr, cr) => rr <= 7 && cr >= 0,
  topTopRight: (rr, cr) => rr >= 0 && cr <= 7,
  botBotRight: (rr, cr) => rr <= 7 && cr <= 7,
  topRightRight: (rr, cr) => rr >= 0 && cr <= 7,
  botRightRight: (rr, cr) => rr <= 7 && cr <= 7,
}));
