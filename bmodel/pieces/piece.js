import { guardBound, guardWrap, mask } from "./utils"

export default class ChessPiece extends Number {
  // Teams
  static WHITE = 0; static BLACK = 1

  // Types
  static ROOK = 0; static PAWN = 1; static BISHOP = 2;
  static KNIGHT = 3; static QUEEN = 4; static KING = 5;

  // Bit ranges: x|xxxxxx|xxx
  static TEAM_BITS = [9, 9]
  static IDEN_BITS = [8, 3]
  static TYPE_BITS = [2, 0]

  // Constructor
  constructor(team, id, type) {
    super(team << ChessPiece.TEAM_BITS[1] | id << ChessPiece.IDEN_BITS[1] | type << ChessPiece.TYPE_BITS[1])
  }

  // FEN symbols
  static WHITE_ROOK = 'R'; static BLACK_ROOK = 'r';
  static WHITE_PAWN = 'P'; static BLACK_PAWN = 'p';
  static WHITE_KING = 'K'; static BLACK_KING = 'k';
  static WHITE_QUEEN = 'Q'; static BLACK_QUEEN = 'q';
  static WHITE_KNIGHT = 'N'; static BLACK_KNIGHT = 'n';
  static WHITE_BISHOP = 'B'; static BLACK_BISHOP = 'b';

  // FEN mapping
  toFEN() {
    switch (this.type()) {
      case ChessPiece.ROOK: return this.team() ? ChessPiece.BLACK_ROOK : ChessPiece.WHITE_ROOK
      case ChessPiece.PAWN: return this.team() ? ChessPiece.BLACK_PAWN : ChessPiece.WHITE_PAWN
      case ChessPiece.KING: return this.team() ? ChessPiece.BLACK_KING : ChessPiece.WHITE_KING
      case ChessPiece.QUEEN: return this.team() ? ChessPiece.BLACK_QUEEN : ChessPiece.WHITE_QUEEN
      case ChessPiece.KNIGHT: return this.team() ? ChessPiece.BLACK_KNIGHT : ChessPiece.WHITE_KNIGHT
      case ChessPiece.BISHOP: return this.team() ? ChessPiece.BLACK_BISHOP : ChessPiece.WHITE_BISHOP
    }
  }

  // FEN lookups
  static getTeamFromFEN(symbol) { return Number(symbol.toLowerCase() === symbol) }

  // Accessor
  bits(start, end) { return (this & (mask(start - end + 1) << end)) >> end }

  // Meta
  team() { return this.bits(...ChessPiece.TEAM_BITS) }
  iden() { return this.bits(...ChessPiece.IDEN_BITS) }
  type() { return this.bits(...ChessPiece.TYPE_BITS) }

  // Orientation
  orient() { return this.team() ? 1 : -1 }
  isWhite() { return this.team() === ChessPiece.WHITE }
  isBlack() { return this.team() === ChessPiece.BLACK }
  lastRank(s) { return Number.isInteger(s) && ((s <= 7 && this.isWhite()) || (s >= 56 && this.isBlack())) }
  secondRank(s) { return (s >= 48 && s <= 55 && this.isWhite()) || (s >= 8 && s <= 15 && this.isBlack()) }

  // Movement types starting from a square (s)
  static moves = {
    RELATIVE: [
      ChessPiece.prototype.kingside = function (s) { return this.isWhite() ? this.right(s) : this.left(s) },
      ChessPiece.prototype.queenside = function (s) { return this.isWhite() ? this.left(s) : this.right(s) },
    ],
    CARDINALS: [
      ChessPiece.prototype.left = function (s) { return guardWrap(s, s + 1 * this.orient()) },
      ChessPiece.prototype.right = function (s) { return guardWrap(s, s - 1 * this.orient()) },
      ChessPiece.prototype.forward = function (s) { return guardBound(s + 8 * this.orient()) },
      ChessPiece.prototype.backward = function (s) { return guardBound(s - 8 * this.orient()) },
    ],
    DIAGONALS: [
      ChessPiece.prototype.forwardLeft = function (s) { return this.left(this.forward(s)) },
      ChessPiece.prototype.forwardRight = function (s) { return this.right(this.forward(s)) },
      ChessPiece.prototype.backwardLeft = function (s) { return this.left(this.backward(s)) },
      ChessPiece.prototype.backwardRight = function (s) { return this.right(this.backward(s)) },
    ],
    KNIGHT: [
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
}
