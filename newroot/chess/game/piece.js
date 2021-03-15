import { v4 as uuid } from 'uuid'
import { rankAndFileOf, indexOf, isInBounds } from '../utils.js'

export default class ChessPiece extends String {
  // Define directionality of movement
  static FORWARD = 1
  static BACKWARD = -1

  // Piece Constants
  static ROOK = 'r'
  static PAWN = 'p'
  static KING = 'k'
  static QUEEN = 'q'
  static KNIGHT = 'n'
  static BISHOP = 'b'

  // Team Constants
  static WHITE = 'w'
  static BLACK = 'b'

  // 2D piece indices are given as [RANK, FILE]
  static RANK = 0
  static FILE = 1

  // Creates a piece with a unique ID
  constructor(type, team) {
    // By FEN convention, white pieces are uppercase
    const assignTeam = team === WHITE
      ? String.prototype.toUpperCase
      : String.prototype.toLowerCase

    super(type.call(assignTeam));
    this.id = uuid()
  }

  // Helper methods
  isWhite() { return this.toString() === this.toUpperCase() }
  isBlack() { return this.toString() !== this.toUpperCase() }

  getType() { return this.toLowerCase() }
  getTeam() { return this.isBlack() ? BLACK : WHITE }
  getOtherTeam() { return this.isBlack() ? WHITE : BLACK }

  // Used when initting the board
  static getTeam(piece) {
    return piece.toLowerCase() === piece.toString() ? ChessPiece.BLACK : ChessPiece.WHITE
  }

  isLastRank(square) {
    const [rank] = rankAndFileOf(square)

    return (this.isWhite() && rank === 7) || (this.isBlack() && rank === 0)
  }

  // Get all moves for any piece. Next determines how the piece moves. See subclasses
  getMoves(game, from, next, steps = Infinity) {
    const moves = []
    const checks = false
    const attacks = new Set()

    let step = 0, to = next(from)

    while (step++ < steps && game.isInBounds(to) && !game.isSameTeam(to, this)) {
      // Add the move, as long as it is legal
      const move = { to, from, piece: game.board[from] }
      if (!game.movePutsKingInCheck(move))
        moves.push(move)

      // Add the attacked square
      attacks.add(to)

      if (game.isOtherTeam(to, this)) {
        // If we check the king, note that
        if (game.board[to].getType() === ChessPiece.KING) checks = true

        return { moves, checks, attacks }
      }

      to = next(to)
    }

    return { moves, checks, attacks }
  }

  // Returns the final index of a given move in a particular direction
  move(from, direction, distance = 1) {
    if (isNaN(from)) return undefined

    const position = rankAndFileOf(from)

    position[direction] += this.orient() * distance

    return indexOf(...position)
  }

  // Orients the piece on the board. Forward depends on which team you are on.
  orient() { return this.isWhite() ? ChessPiece.FORWARD : ChessPiece.BACKWARD }

  // Move types
  moveLeft(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance * -1) }
  moveRight(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance) }
  moveForward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance) }
  moveBackward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance * -1) }
  moveKingSide(from, distance = 1) { return this.move(from, ChessPiece.FILE, this.orient() * distance) }
  moveQueenSide(from, distance = 1) { return this.move(from, ChessPiece.FILE, this.orient() * distance * -1) }

  moveForwardLeft(from, distance = 1) { return this.moveForward(this.moveLeft(from, distance), distance) }
  moveForwardRight(from, distance = 1) { return this.moveForward(this.moveRight(from, distance), distance) }
  moveBackwardLeft(from, distance = 1) { return this.moveBackward(this.moveLeft(from, distance), distance) }
  moveBackwardRight(from, distance = 1) { return this.moveBackward(this.moveRight(from, distance), distance) }
}
