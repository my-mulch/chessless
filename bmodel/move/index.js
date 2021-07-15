import { ChessPiece } from "../pieces"
import { isIterable } from "../utils"

export default class ChessMove {
  constructor({ start, end, piece, empty = false, capture = false, check = false, special = () => { } }) {
    Object.assign(this, { start, end, piece, empty, capture, special })
  }

  static *generator({ game, piece, candidate, start, check = false }) {
    // Special move
    if (piece.hasOwnProperty(candidate.name)) {
      const result = candidate.call(piece, game, start)

      if (isIterable(result)) yield* result
      else if (result) yield result

      return
    }

    let end = start
    let limit = piece.constructor.limit

    // If we're running things in reverse looking for checks
    if (check) { limit = ChessPiece.moves.KNIGHT.includes(candidate) ? 1 : 8 }

    do {
      end = move.call(piece, end)
      yield new ChessMove({ start, end, piece, empty: true, capture: true, check })
    } while (Number.isInteger(end) && limit--)
  }
}
