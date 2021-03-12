import { v4 as uuid } from 'uuid'
import { rankAndFileOf, indexOf, isInBounds, isBlack, isSameTeam, isOtherTeam } from '../utils.js'

export default class ChessPiece extends String {
  // Define directionality of movement
  static FORWARD = 1
  static BACKWARD = -1

  // Team constants
  static WHITE = 'w'
  static BLACK = 'b'

  // 2-D piece indices are given as [RANK, FILE]
  static RANK = 0
  static FILE = 1

  // Creates a piece with a unique ID
  constructor() { this.id = uuid() }

  // Helper methods
  isWhite() { return this.toString() === this.toUpperCase() }
  isBlack() { return this.toString() !== this.toUpperCase() }

  getTeam() { return this.isBlack() ? BLACK : WHITE }
  getOtherTeam() { return this.isBlack() ? WHITE : BLACK }

  isSameTeam(board, square) { return board[square] && board[square].getTeam() === this.getTeam() }
  isOtherTeam(board, square) { return board[square] && board[square].getTeam() !== this.getTeam() }
  
  // Get all moves for any piece. Next determines how the piece moves. See subclasses
  getMoves(from, board, next, steps = Infinity) {
    const moves = {}

    let step = 0
    let to = next(from)

    while (step++ < steps && isInBounds(board, to) && !isSameTeam(board, to, this.toString())) {
      moves[to] = { from, to }

      if (isOtherTeam(board, to, this.toString()))
        return moves

      to = next(to)
    }

    return moves
  }

  // Returns the final index of a given move in a particular direction
  move(from, direction, distance = 1) {
    if (isNaN(from)) return undefined

    const position = rankAndFileOf(from)

    position[direction] += this.orient() * distance

    return indexOf(...position)
  }

  // Orients the piece on the board. Forward depends on which team you are on.
  orient() { return isBlack(this.toString()) ? ChessPiece.BACKWARD : ChessPiece.FORWARD }

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
