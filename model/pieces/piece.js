import { v4 as uuid } from 'uuid'
import { rankAndFileOf, indexOf } from '../utils.js'

export default class ChessPiece extends String {
  // Define directionality of movement
  static FORWARD = 1
  static BACKWARD = -1

  // Team Constants
  static WHITE = 'w'
  static BLACK = 'b'

  // 2D piece indices are given as [RANK, FILE]
  static RANK = 0
  static FILE = 1

  // Piece Constants
  static ROOK = 'r'; static WHITE_ROOK = 'R'; static BLACK_ROOK = 'r'
  static PAWN = 'p'; static WHITE_PAWN = 'P'; static BLACK_PAWN = 'p'
  static KING = 'k'; static WHITE_KING = 'K'; static BLACK_KING = 'k'
  static QUEEN = 'q'; static WHITE_QUEEN = 'Q'; static BLACK_QUEEN = 'q'
  static KNIGHT = 'n'; static WHITE_KNIGHT = 'N'; static WHITE_BISHOP = 'B'
  static BISHOP = 'b'; static BLACK_KNIGHT = 'n'; static BLACK_BISHOP = 'b'

  // Piece Attacks
  static attacks = { KNIGHT: 'k', DIAGONAL: 'd', CARDINAL: 'c' }

  // Piece Moves
  static moves = {
    RELATIVE: [
      ChessPiece.prototype.moveKingSide = function (from, d = 1) { return this.isWhite() ? this.moveRight(from, d) : this.moveLeft(from, d) },
      ChessPiece.prototype.moveQueenSide = function (from, d = 1) { return this.isWhite() ? this.moveLeft(from, d) : this.moveRight(from, d) },
    ],
    DIAGONALS: [
      ChessPiece.prototype.moveForwardLeft = function (from, d = 1) { return this.moveForward(this.moveLeft(from, d), d) },
      ChessPiece.prototype.moveForwardRight = function (from, d = 1) { return this.moveForward(this.moveRight(from, d), d) },
      ChessPiece.prototype.moveBackwardLeft = function (from, d = 1) { return this.moveBackward(this.moveLeft(from, d), d) },
      ChessPiece.prototype.moveBackwardRight = function (from, d = 1) { return this.moveBackward(this.moveRight(from, d), d) },
    ],
    CARDINALS: [
      ChessPiece.prototype.moveLeft = function (from, d = 1) { return this.move(from, ChessPiece.FILE, d) },
      ChessPiece.prototype.moveRight = function (from, d = 1) { return this.move(from, ChessPiece.FILE, d * -1) },
      ChessPiece.prototype.moveForward = function (from, d = 1) { return this.move(from, ChessPiece.RANK, d) },
      ChessPiece.prototype.moveBackward = function (from, d = 1) { return this.move(from, ChessPiece.RANK, d * -1) },
    ],
    KNIGHT: [
      ChessPiece.prototype.hopLeftForward = function (from) { return this.moveForward(this.moveLeft(from, 2)) },
      ChessPiece.prototype.hopForwardLeft = function (from) { return this.moveLeft(this.moveForward(from, 2)) },
      ChessPiece.prototype.hopLeftBackward = function (from) { return this.moveBackward(this.moveLeft(from, 2)) },
      ChessPiece.prototype.hopBackwardLeft = function (from) { return this.moveLeft(this.moveBackward(from, 2)) },
      ChessPiece.prototype.hopRightForward = function (from) { return this.moveForward(this.moveRight(from, 2)) },
      ChessPiece.prototype.hopForwardRight = function (from) { return this.moveRight(this.moveForward(from, 2)) },
      ChessPiece.prototype.hopRightBackward = function (from) { return this.moveBackward(this.moveRight(from, 2)) },
      ChessPiece.prototype.hopBackwardRight = function (from) { return this.moveRight(this.moveBackward(from, 2)) },
    ]
  }

  // Creates a piece with a unique ID
  constructor(type, team, id) {
    // By FEN convention, white pieces are uppercase
    const assignTeam = team === ChessPiece.WHITE
      ? String.prototype.toUpperCase
      : String.prototype.toLowerCase

    super(assignTeam.call(type));
    this.id = id || uuid()
  }

  // Helper methods
  static isKingSide(square) { return rankAndFileOf(square)[ChessPiece.FILE] > 3 }
  static isQueenSide(square) { return rankAndFileOf(square)[ChessPiece.FILE] < 4 }

  static doesAttack(piece, from, to, direction) {
    return piece.constructor.attackDirections.has(direction)
      && (piece.attackInRange ? piece.attackInRange(from, to) : true)
  }

  static getTeam(piece) { return piece.toLowerCase() === piece.toString() ? ChessPiece.BLACK : ChessPiece.WHITE }

  getType() { return this.toLowerCase() }
  isWhite() { return this.toString() === this.toUpperCase() }
  isBlack() { return this.toString() !== this.toUpperCase() }
  getTeam() { return this.isBlack() ? ChessPiece.BLACK : ChessPiece.WHITE }
  getOtherTeam() { return this.isBlack() ? ChessPiece.WHITE : ChessPiece.BLACK }

  isLastRank(square, [rank] = rankAndFileOf(square)) {
    return (this.isWhite() && rank === 0) || (this.isBlack() && rank === 7)
  }

  // Get all moves for any piece. `next` determines how the piece moves. See subclasses
  considerMove({ game, move, to, moves }) {
    if (game.movePutsKingInCheck(move))
      return

    moves.push(move)

    if (game.isOtherTeam(to, this))
      return moves
  }

  getMoves({
    game, // The current game
    from, // from where to begin looking for moves or checks
    next, // how this particular piece moves
    steps = Infinity, // how many steps is this piece allowed to take in a given direction
    check = null, // if we're looking for checks, how will the king be attacked? E.g diagonally or by a knight 
    special = () => { }, // handles any side effects the move may have to perform
    action = this.considerMove, // determines the logic of the while loop
  }) {
    const moves = []
    let step = 0, to = next(from)

    while (step++ < steps && game.isInBounds(to) && !game.isSameTeam(to, this)) {
      // Add the move, as long as it is legal
      const move = { to, from, piece: this, special }

      // Either look for moves or checks
      const result = action.call(this, { game, move, from, to, check, moves })

      // If we've run into the other team, we're done
      if (result !== undefined) return result

      // Otherwise keep going
      to = next(to)
    }

    // Our return value differs if we are the king seeking checks or a piece seeking moves
    return check ? false : moves
  }

  // Returns the final index of a given move in a particular direction
  move(from, direction, d = 1) {
    if (isNaN(from)) return undefined

    const position = rankAndFileOf(from)

    position[direction] += this.orient() * d

    return indexOf(...position)
  }

  // Orients the piece on the board. Forward depends on which team you are on.
  orient() { return this.isWhite() ? ChessPiece.BACKWARD : ChessPiece.FORWARD }
}
