import { rankAndFileOf, indexOf } from './utils'

export default class ChessPiece extends String {
  // Define directionality of movement
  static FORWARD = 1
  static BACKWARD = -1

  // 2-D piece indices are given as [RANK, FILE]
  static RANK = 0
  static FILE = 1

  isBlack() {
    return this !== this.toUpperCase()
  }

  move(from, direction, distance = 1) {
    if (isNaN(from)) return undefined

    const position = rankAndFileOf(from)

    position[direction] += this.orient() * distance

    return indexOf(...position)
  }

  isLastRank(square) {
    const [rank] = rankAndFileOf(square)

    return (!this.isBlack() && rank === 7) || (this.isBlack() && rank === 0)
  }

  // Piece moves
  orient() { return this.isBlack() ? ChessPiece.BACKWARD : ChessPiece.FORWARD }

  moveLeft(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance * -1) }
  moveRight(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance) }
  moveForward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance) }
  moveBackward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance * -1) }

  moveForwardLeft(from, distance = 1) { return this.moveForward(this.moveLeft(from, distance), distance) }
  moveForwardRight(from, distance = 1) { return this.moveForward(this.moveRight(from, distance), distance) }
  moveBackwardLeft(from, distance = 1) { return this.moveBackward(this.moveLeft(from, distance), distance) }
  moveBackwardRight(from, distance = 1) { return this.moveBackward(this.moveRight(from, distance), distance) }


  moveKingSide(from, distance = 1) { return this.move(from, ChessPiece.FILE, this.orient() * distance) }
  moveQueenSide(from, distance = 1) { return this.move(from, ChessPiece.FILE, this.orient() * distance * -1) }
}
