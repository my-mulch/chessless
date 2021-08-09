import { moves } from './utils.js';

export const kingAttackTable = [...new Array(64).keys()].map(moves.bind(null, {
  limit: 1,
  top: ({ rr }) => rr[0] >= 0,
  bot: ({ rr }) => rr[0] <= 7,
  left: ({ cr }) => cr[0] >= 0,
  right: ({ cr }) => cr[0] <= 7,
  topLeft: ({ rr, cr }) => rr[0] >= 0 && cr[0] >= 0,
  botLeft: ({ rr, cr }) => rr[0] <= 7 && cr[0] >= 0,
  topRight: ({ rr, cr }) => rr[0] >= 0 && cr[0] <= 7,
  botRight: ({ rr, cr }) => rr[0] <= 7 && cr[0] <= 7,
}));
