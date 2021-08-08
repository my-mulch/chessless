let state = 1804289383;

export function randomInt64() {
  state ^= state << 13; state >>>= 0;
  state ^= state >>> 17;
  state ^= state << 5; state >>>= 0;

  return state;
}

console.log(randomInt64());
console.log(randomInt64());
console.log(randomInt64());
console.log(randomInt64());
console.log(randomInt64());
