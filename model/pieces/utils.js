
export function row(square) {
  return Math.floor(square / 8)
}

export function allIntegers(...ints) {
  return ints.every(Number.isInteger)
}

export function sameRow(square1, square2) {
  return row(square1) === row(square2)
}

export function guardBound(square, newSquare) {
  return allIntegers(square, newSquare) && newSquare >= 0 && newSquare <= 63 && newSquare
}

export function guardWrap(square, newSquare) {
  return allIntegers(square, newSquare) && sameRow(square, newSquare) && newSquare
}
