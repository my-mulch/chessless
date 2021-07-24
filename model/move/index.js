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
  static special(effect) { return move => move.special = effect && move }

  make(game) {
    const newGame = game.clone()

    newGame.board[this.end] = newGame.board[this.start]
    newGame.board[this.start] = null
    newGame.enpassant = null

    this.special.call(this.piece, newGame)

    return newGame
  }

  static generator({ game, piece, move, start, check }) {
    if (piece.constructor.prototype.hasOwnProperty(move.name)) {
      const candidates = move.call(piece, game, start, check)

      return { candidates: [candidates].filter(Boolean).flat(), sequential: false }
    }

    let end = start, { limit } = piece.constructor
    const candidates = [], { special } = move

    do {
      end = move.call(piece, end)
      candidates.push(new ChessMove({ start, end, piece, empty: true, capture: true, check, special }))
    } while (Number.isInteger(end) && --limit);

    return { candidates, sequential: true }
  }
}
