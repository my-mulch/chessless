export default class ChessMove {
  constructor({ start, end, piece, empty = false, capture = false, checking = false, special = () => { } }) {
    Object.assign(this, { start, end, piece, empty, capture, checking, special })
  }

  static special(effect) { return move => (move.special = effect) && move }

  outOfBounds() { return this.end === false }
  canMove(game) { return game.empty(this.end) && this.empty }
  putsOwnKingInCheck(game) { return this.make(game).kingIsInCheck() }
  canCapture(game) { return this.runsIntoOpponent(game) && this.capture }
  runsIntoOpponent(game) { return !game.empty(this.end) && game.board[this.start].team() !== game.board[this.end].team() }
  runsIntoTeammate(game) { return !game.empty(this.end) && game.board[this.start].team() === game.board[this.end].team() }

  make(game) {
    const newGame = game.clone()

    newGame.board[this.end] = newGame.board[this.start]
    newGame.board[this.start] = null
    newGame.enpassant = null

    this.special.call(this.piece, newGame)

    return newGame
  }

  static generator({ game, piece, move, start, checking }) {
    if (piece.constructor.prototype.hasOwnProperty(move.name)) {
      return {
        candidates: move.call(piece, game, start, checking),
        sequential: false
      }
    }

    let end = start, { limit } = piece.constructor
    const candidates = [], { special } = move

    do {
      end = move.call(piece, end)

      candidates.push(new ChessMove({
        start, end, piece, empty: true, capture: true, checking, special
      }))

    } while (Number.isInteger(end) && --limit);

    return { candidates, sequential: true }
  }
}
