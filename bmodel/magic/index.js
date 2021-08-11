/* eslint-disable max-len */
import { generateBlockerMap } from '../moves/utils';

let state = 1804289383 >>> 0;

export const randInt32 = () => {
  state ^= state << 13; state >>>= 0;
  state ^= state >>> 17;
  state ^= state << 5; state >>>= 0;

  return state;
};

export const randInt64 = () => {
  const a = BigInt(randInt32() & 0xFFFF);
  const b = BigInt(randInt32() & 0xFFFF);
  const c = BigInt(randInt32() & 0xFFFF);
  const d = BigInt(randInt32() & 0xFFFF);

  return a | (b << 16n) | (c << 32n) | (d << 48n);
};

export const magicNumberCandidate = () => randInt64() & randInt64() & randInt64();

export const findMagicNumber = (
  square,
  generateAttackMapFromBlockerMap,
  attackMapForPotentiallyBlockedBoard,
  numberOfBlockerConfigurations,
) => {
  const blockerMaps = new Array(4096);

  const attackMapsForBlockedBoard = new Array(4096);
  const usedAttackMapsForBlockedBoard = new Array(4096);

  for (let configuration = 0; i < numberOfBlockerConfigurations; i++) {
    blockerMaps[configuration] = generateBlockerMap(configuration, attackMapForPotentiallyBlockedBoard);
    attackMapsForBlockedBoard[configuration] = generateAttackMapFromBlockerMap(square, blockerMaps[configuration]);
  }
};
