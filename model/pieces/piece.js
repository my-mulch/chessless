import { v4 as uuid } from 'uuid'
import { rankAndFileOf, indexOf } from '../utils.js'

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

  // Piece Attacks
  static ATTACKS_KNIGHTLY = 'k'
  static ATTACKS_DIAGONALLY = 'd'
  static ATTACKS_CARDINALLY = 'c'

  // Team Constants
  static WHITE = 'w'
  static BLACK = 'b'

  // 2D piece indices are given as [RANK, FILE]
  static RANK = 0
  static FILE = 1

  // Creates a piece with a unique ID
  constructor(type, team, id) {
    // By FEN convention, white pieces are uppercase
    const assignTeam = team === ChessPiece.WHITE
      ? String.prototype.toUpperCase
      : String.prototype.toLowerCase

    super(assignTeam.call(type));
    this.id = id || uuid()
  }

  static doesAttack(piece, from, to, direction) {
    return (
      piece.constructor.attackDirections.has(direction) &&
      piece.constructor.attackInRange(from, to)
    )
  }

  // Helper methods
  isWhite() { return this.toString() === this.toUpperCase() }
  isBlack() { return this.toString() !== this.toUpperCase() }

  getType() { return this.toLowerCase() }
  getTeam() { return this.isBlack() ? ChessPiece.BLACK : ChessPiece.WHITE }
  getOtherTeam() { return this.isBlack() ? ChessPiece.WHITE : ChessPiece.BLACK }

  // Used when initting the board
  static getTeam(piece) {
    return piece.toLowerCase() === piece.toString() ? ChessPiece.BLACK : ChessPiece.WHITE
  }

  isLastRank(square) {
    const [rank] = rankAndFileOf(square)

    return (this.isWhite() && rank === 0) || (this.isBlack() && rank === 7)
  }

  // Get all moves for any piece. `next` determines how the piece moves. See subclasses
  getMoves(game, from, next, steps = Infinity, kingCheckDirection = null) {
    const moves = []
    let step = 0, to = next(from)

    while (step++ < steps && game.isInBounds(to) && !game.isSameTeam(to, this)) {
      // Add the move, as long as it is legal
      const move = { to, from, piece: this }

      // If we encounter the other team
      if (game.isOtherTeam(to, this)) {
        // Are we looking for checks?
        if (kingCheckDirection) {
          return ChessPiece.doesAttack(game.board[to], from, to, kingCheckDirection)
        }
        // Or just for legal moves?
        else if (!game.movePutsKingInCheck(move)) {
          return moves.concat(move)
        }
      }

      // Otherwise just a blank square, but need to ensure we're not a king looking for checks
      // and that the move is legal
      if (!kingCheckDirection && !game.movePutsKingInCheck(move))
        moves.push(move)

      to = next(to)
    }

    // Our return value differs if we are the king seeking checks or a piece seeking moves
    return kingCheckDirection ? false : moves
  }

  // Returns the final index of a given move in a particular direction
  move(from, direction, distance = 1) {
    if (isNaN(from)) return undefined

    const position = rankAndFileOf(from)

    position[direction] += this.orient() * distance

    return indexOf(...position)
  }

  // Orients the piece on the board. Forward depends on which team you are on.
  orient() { return this.isWhite() ? ChessPiece.BACKWARD : ChessPiece.FORWARD }

  // Move types
  moveLeft(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance) }
  moveRight(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance * -1) }
  moveForward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance) }
  moveBackward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance * -1) }
  moveKingSide(from, distance = 1) { return this.isWhite() ? this.moveRight(from, distance) : this.moveLeft(from, distance) }
  moveQueenSide(from, distance = 1) { return this.isWhite() ? this.moveLeft(from, distance) : this.moveRight(from, distance) }

  moveForwardLeft(from, distance = 1) { return this.moveForward(this.moveLeft(from, distance), distance) }
  moveForwardRight(from, distance = 1) { return this.moveForward(this.moveRight(from, distance), distance) }
  moveBackwardLeft(from, distance = 1) { return this.moveBackward(this.moveLeft(from, distance), distance) }
  moveBackwardRight(from, distance = 1) { return this.moveBackward(this.moveRight(from, distance), distance) }
}
