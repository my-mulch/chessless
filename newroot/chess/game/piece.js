import { rankAndFileOf, indexOf, isInBounds, isBlack, isSameTeam, isOtherTeam } from '../utils.js'

export default class ChessPiece {
  // Define directionality of movement
  static FORWARD = 1
  static BACKWARD = -1

  // 2-D piece indices are given as [RANK, FILE]
  static RANK = 0
  static FILE = 1

  static find(piece, from, board, next, steps = Infinity) {
    const moves = {}

    let step = 0
    let to = next(piece, from)

    while (step++ < steps && isInBounds(board, to) && !isSameTeam(board, to, piece)) {
      moves[to] = { from, to }
      
      if (isOtherTeam(board, to, piece))
        return

      to = next(to)
    }

    return moves
  }

  static move(piece, from, direction, distance = 1) {
    if (isNaN(from)) return undefined

    const position = rankAndFileOf(from)

    position[direction] += ChessPiece.orient(piece) * distance

    return indexOf(...position)
  }

  // Piece moves
  static orient(piece) { return isBlack(piece) ? ChessPiece.BACKWARD : ChessPiece.FORWARD }

  static moveLeft(piece, from, distance = 1) { return ChessPiece.move(piece, from, ChessPiece.FILE, distance * -1) }
  static moveRight(piece, from, distance = 1) { return ChessPiece.move(piece, from, ChessPiece.FILE, distance) }
  static moveForward(piece, from, distance = 1) { return ChessPiece.move(piece, from, ChessPiece.RANK, distance) }
  static moveBackward(piece, from, distance = 1) { return ChessPiece.move(piece, from, ChessPiece.RANK, distance * -1) }

  static moveForwardLeft(piece, from, distance = 1) { return ChessPiece.moveForward(piece, ChessPiece.moveLeft(piece, from, distance), distance) }
  static moveForwardRight(piece, from, distance = 1) { return ChessPiece.moveForward(piece, ChessPiece.moveRight(piece, from, distance), distance) }
  static moveBackwardLeft(piece, from, distance = 1) { return ChessPiece.moveBackward(piece, ChessPiece.moveLeft(piece, from, distance), distance) }
  static moveBackwardRight(piece, from, distance = 1) { return ChessPiece.moveBackward(piece, ChessPiece.moveRight(piece, from, distance), distance) }


  static moveKingSide(piece, from, distance = 1) { return ChessPiece.move(piece, from, ChessPiece.FILE, ChessPiece.orient(piece) * distance) }
  static moveQueenSide(piece, from, distance = 1) { return ChessPiece.move(piece, from, ChessPiece.FILE, ChessPiece.orient(piece) * distance * -1) }
}
