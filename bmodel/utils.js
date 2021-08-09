let state = 1804289383 >>> 0;

export function randInt32() {
  state ^= state << 13; state >>>= 0;
  state ^= state >>> 17;
  state ^= state << 5; state >>>= 0;

  return state;
}

export function randInt64() {
  function helper() {
    const a = BigInt(randInt32() & 0xFFFF);
    const b = BigInt(randInt32() & 0xFFFF);
    const c = BigInt(randInt32() & 0xFFFF);
    const d = BigInt(randInt32() & 0xFFFF);

    return a | (b << 16n) | (c << 32n) | (d << 48n);
  }

  return helper() & helper() & helper();
}
