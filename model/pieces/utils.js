
export function mask(size) {
  return 2 ** size - 1
}

export function row(square) {
  return Math.floor(square / 8)
}

export function allIntegers(...ints) {
  return ints.every(Number.isInteger)
}

export function sameRow(square1, square2) {
  return row(square1) === row(square2)
}

export function guardBound(square) {
  return Number.isInteger(square) && square >= 0 && square <= 63 && square
}

export function guardWrap(square, newSquare) {
  return allIntegers(square, newSquare) && sameRow(square, newSquare) && newSquare
}
