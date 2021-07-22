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
  static special(effect) { return candidate => candidate.special = effect && candidate }

  make(game) {
    const newGame = game.clone()

    newGame.board[this.end] = newGame.board[this.start]
    newGame.board[this.start] = null
    newGame.enpassant = null

    this.special.call(this.piece, newGame)

    return newGame
  }

  static generator({ game, piece, candidate, start, check }) {
    if (piece.constructor.prototype.hasOwnProperty(candidate.name)) {
      const moves = candidate.call(piece, game, start, check)

      return [moves].filter(Boolean).flat()
    }

    let end = start, { limit } = piece.constructor
    const moves = [], { special } = candidate

    do {
      end = candidate.call(piece, end)
      moves.push(new ChessMove({ start, end, piece, empty: true, capture: true, check, special }))
    } while (Number.isInteger(end) && --limit);

    return moves
  }
}
