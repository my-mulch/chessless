import { isIterable } from "../utils"

export default class ChessMove {
  constructor({ start, end, piece, empty = false, capture = false, check = false, special = () => { } }) {
    Object.assign(this, { start, end, piece, empty, capture, special })
  }

  // Helpers
  outOfBounds() { return this.end === false }
  canMove(game) { return !game.board[this.end] && this.empty }
  canCapture(game) { return this.runsIntoOpponent(game) && this.capture }
  runsIntoOpponent(game) { return game.board[this.end] && game.board[this.start].team() !== game.board[this.end].team() }
  runsIntoTeammate(game) { return game.board[this.end] && game.board[this.start].team() === game.board[this.end].team() }
  putsOwnKingInCheck(game) {  }

  // Move generator
  static *generator({ game, piece, candidate, start, check = false }) {
    // Special move
    if (piece.hasOwnProperty(candidate.name)) {
      const result = candidate.call(piece, game, start)

      if (isIterable(result)) yield* result
      else if (result) yield result

      return
    }

    let end = start, limit = piece.constructor.limit

    do {
      end = move.call(piece, end)
      yield new ChessMove({ start, end, piece, empty: true, capture: true, check })
    } while (Number.isInteger(end) && limit--)
  }
}
