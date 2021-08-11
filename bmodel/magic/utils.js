/* eslint-disable max-len */
import { countBits } from '../game/utils.js';
import { generateBlockerMap } from '../moves/utils.js';

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

export const trimInt64 = (bigInt) => bigInt & 0xFFFFFFFFFFFFFFFFn;
export const generateMagicNumberCandidate = () => randInt64() & randInt64() & randInt64();

export const findMagicNumber = (
  square,
  generateAttackMapFromBlockerMap,
  attackMapForPotentiallyBlockedBoard,
  numberOfBlockerConfigurationBits,
) => {
  const blockerMaps = new Array(4096);
  const attackMapsForBlockedBoard = new Array(4096);
  const magicAttackMapsForBlockedBoard = new Array(4096);
  const numberOfBlockerConfigurations = 1n << numberOfBlockerConfigurationBits;

  for (let configuration = 0n; configuration < numberOfBlockerConfigurations; configuration++) {
    blockerMaps[configuration] = generateBlockerMap(configuration, attackMapForPotentiallyBlockedBoard);
    attackMapsForBlockedBoard[configuration] = generateAttackMapFromBlockerMap(square, blockerMaps[configuration]);
  }

  for (let i = 0n; i < 100_000_000n; i++) {
    const candidateNumber = generateMagicNumberCandidate();

    if (countBits((trimInt64(attackMapForPotentiallyBlockedBoard * candidateNumber)) & 0xFF00000000000000n) < 6n) {
      continue;
    }

    let fail = false;
    magicAttackMapsForBlockedBoard.fill(0n);

    for (let configuration = 0n; configuration < numberOfBlockerConfigurations; configuration++) {
      const candidateIndex = trimInt64(blockerMaps[configuration] * candidateNumber) >> (64n - numberOfBlockerConfigurationBits);

      const attackMapForBlockedBoard = attackMapsForBlockedBoard[configuration];
      const magicAttackMapForBlockedBoard = magicAttackMapsForBlockedBoard[candidateIndex];

      if (magicAttackMapForBlockedBoard && magicAttackMapForBlockedBoard !== attackMapForBlockedBoard) {
        fail = true;
        break;
      }

      magicAttackMapsForBlockedBoard[candidateIndex] = attackMapForBlockedBoard;
    }

    if (!fail) {
      return candidateNumber;
    }
  }

  return null;
};
