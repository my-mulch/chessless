
export default class ChessMove {
  constructor({ start, end, piece, empty = false, capture = false, check = false, special = () => { } }) {
    Object.assign(this, { start, end, piece, empty, capture, check, special })
  }

  outOfBounds() { return this.end === false }
  canMove(game) { return !game.board[this.end] && this.empty }
  putsOwnKingInCheck(game) { return this.make(game).kingIsInCheck() }
  canCapture(game) { return this.runsIntoOpponent(game) && this.capture }
  runsIntoOpponent(game) { return game.board[this.end] && game.board[this.start].team() !== game.board[this.end].team() }
  runsIntoTeammate(game) { return game.board[this.end] && game.board[this.start].team() === game.board[this.end].team() }

  make(game) {
    const newGame = game.clone()

    newGame.board[this.end] = newGame.board[this.start]
    newGame.board[this.start] = null

    this.special(newGame)

    return newGame
  }

  static *generator({ game, piece, candidate, start, check }) {
    if (piece.constructor.prototype.hasOwnProperty(candidate.name)) {
      const result = candidate.call(piece, game, start, check)

      if (result) yield* [result].flat()
      
      return
    }

    let end = move.call(piece, start), limit = piece.constructor.limit

    while (Number.isInteger(end) && limit--)
      yield new ChessMove({ start, end, piece, empty: true, capture: true, check })
  }
}
