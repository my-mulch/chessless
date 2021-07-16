import King from "../pieces/king"
import { isIterable } from "../utils"

export default class ChessMove {
  constructor({ start, end, piece, empty = false, capture = false, check = false, special = () => { } }) {
    Object.assign(this, { start, end, piece, empty, capture, check, special })
  }

  outOfBounds() { return this.end === false }
  canMove(game) { return !game.board[this.end] && this.empty }
  canCapture(game) { return this.runsIntoOpponent(game) && this.capture }
  runsIntoOpponent(game) { return game.board[this.end] && game.board[this.start].team() !== game.board[this.end].team() }
  runsIntoTeammate(game) { return game.board[this.end] && game.board[this.start].team() === game.board[this.end].team() }

  putsOwnKingInCheck(game) {
    const newGame = this.make(game)

    return newGame
      .getMoves({ check: true })
      .some(move => newGame[move.end] && newGame[move.end].type() === King)
  }

  make(game) {
    const newGame = game.clone()

    newGame.board[this.end] = newGame.board[this.start]
    newGame.board[this.start] = null

    this.special(newGame)

    newGame.changeTurns()

    return newGame
  }

  // Move generator
  static *generator({ game, piece, candidate, start, check }) {
    // Special move
    if (piece.constructor.prototype.hasOwnProperty(candidate.name)) {
      const result = candidate.call(piece, game, start, check)

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
