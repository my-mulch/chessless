import { isIterable } from "../utils"

export default class ChessMove {
  constructor({ start, end, piece, empty = false, capture = false, special = () => { } }) {
    Object.assign(this, { start, end, piece, empty, capture, special })
  }

  static *generator(game, piece, move, start) {
    // Special move
    if (piece.hasOwnProperty(move.name)) {
      const result = move.call(piece, game, start)

      if (isIterable(result)) yield* result
      else if (result) yield result

      return
    }

    let end = start
    let limit = piece.constructor.limit

    do {
      end = move.call(piece, end)
      yield new ChessMove({ start, end, piece, empty: true, capture: true })
    } while (Number.isInteger(end) && limit--)
  }
}