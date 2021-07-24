import { guardBound, guardWrap } from "./utils"

export default class ChessPiece extends String {
  // FEN symbols
  static WHITE = 'w'; static BLACK = 'b'
  static ROOK = 'r'; static WHITE_ROOK = 'R'; static BLACK_ROOK = 'r'
  static PAWN = 'p'; static WHITE_PAWN = 'P'; static BLACK_PAWN = 'p'
  static KING = 'k'; static WHITE_KING = 'K'; static BLACK_KING = 'k'
  static QUEEN = 'q'; static WHITE_QUEEN = 'Q'; static BLACK_QUEEN = 'q'
  static KNIGHT = 'n'; static WHITE_KNIGHT = 'N'; static BLACK_KNIGHT = 'n'
  static BISHOP = 'b'; static WHITE_BISHOP = 'B'; static BLACK_BISHOP = 'b'

  // FEN helpers
  static otherTeamFEN(team) { return team === this.WHITE ? this.BLACK : this.WHITE }
  static getTeamFromFEN(piece) { return piece.toLowerCase() === piece ? this.BLACK : this.WHITE }
  static assignTeamForFEN(piece, team) { return team === this.WHITE ? piece.toUpperCase() : piece.toLowerCase() }

  // Orientation
  orient() { return this.isWhite() ? -1 : 1 }
  isWhite() { return this.toString() === this.toUpperCase() }
  isBlack() { return this.toString() !== this.toUpperCase() }
  team() { return this.isWhite() ? ChessPiece.WHITE : ChessPiece.BLACK }
  lastRank(s) { return Number.isInteger(s) && ((s <= 7 && this.isWhite()) || (s >= 56 && this.isBlack())) }
  secondRank(s) { return (s >= 48 && s <= 55 && this.isWhite()) || (s >= 8 && s <= 15 && this.isBlack()) }

  // Specials
  revokeCastles(game) { return game.castles.replace(this.rights, '') }

  // Movement starting from a square (s)
  static limit = 8

  static RELATIVE = [
    ChessPiece.prototype.kingside = function (s) { return this.isWhite() ? this.right(s) : this.left(s) },
    ChessPiece.prototype.queenside = function (s) { return this.isWhite() ? this.left(s) : this.right(s) },
  ]

  static CARDINALS = [
    ChessPiece.prototype.left = function (s) { return guardWrap(s, s + 1 * this.orient()) },
    ChessPiece.prototype.right = function (s) { return guardWrap(s, s - 1 * this.orient()) },
    ChessPiece.prototype.forward = function (s) { return guardBound(s, s + 8 * this.orient()) },
    ChessPiece.prototype.backward = function (s) { return guardBound(s, s - 8 * this.orient()) },
  ]

  static DIAGONALS = [
    ChessPiece.prototype.forwardLeft = function (s) { return this.left(this.forward(s)) },
    ChessPiece.prototype.forwardRight = function (s) { return this.right(this.forward(s)) },
    ChessPiece.prototype.backwardLeft = function (s) { return this.left(this.backward(s)) },
    ChessPiece.prototype.backwardRight = function (s) { return this.right(this.backward(s)) },
  ]

  static KNIGHTS = [
    ChessPiece.prototype.hopLeftForward = function (s) { return this.forward(this.left(this.left(s))) },
    ChessPiece.prototype.hopForwardLeft = function (s) { return this.left(this.forward(this.forward(s))) },
    ChessPiece.prototype.hopLeftBackward = function (s) { return this.backward(this.left(this.left(s))) },
    ChessPiece.prototype.hopBackwardLeft = function (s) { return this.left(this.backward(this.backward(s))) },
    ChessPiece.prototype.hopRightForward = function (s) { return this.forward(this.right(this.right(s))) },
    ChessPiece.prototype.hopForwardRight = function (s) { return this.right(this.forward(this.forward(s))) },
    ChessPiece.prototype.hopRightBackward = function (s) { return this.backward(this.right(this.right(s))) },
    ChessPiece.prototype.hopBackwardRight = function (s) { return this.right(this.backward(this.backward(s))) },
  ]
}
