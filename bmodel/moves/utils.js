export function arrayToBitBoard(array) {
  return BigInt(`0b${array.join('')}`);
}

export function bitBoardToString(board) {
  return board
    .toString(2)
    .padStart(64, 0)
    .match(/.{1,8}/g)
    .map((row) => row.split('').join(' '))
    .join('\n');
}
