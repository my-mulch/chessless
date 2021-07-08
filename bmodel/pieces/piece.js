import { guardBound, guardWrap, mask } from "./utils"

export default class ChessPiece extends Number {
  // Teams
  static WHITE = 0; static BLACK = 1

  // Types
  static ROOK = 0; static PAWN = 1; static BISHOP = 2;
  static KNIGHT = 3; static QUEEN = 4; static KING = 5;

  // FEN symbols
  static WHITE_ROOK = 'R'; static BLACK_ROOK = 'r';
  static WHITE_PAWN = 'P'; static BLACK_PAWN = 'p';
  static WHITE_KING = 'K'; static BLACK_KING = 'k';
  static WHITE_QUEEN = 'Q'; static BLACK_QUEEN = 'q';
  static WHITE_KNIGHT = 'N'; static BLACK_KNIGHT = 'n';
  static WHITE_BISHOP = 'B'; static BLACK_BISHOP = 'b';

  // FEN lookups
  static getTeam(symbol) { return Number(symbol.toLowerCase() === symbol) }

  // Bit ranges: x|xxxxxx|xxxxxx|xxx
  static TEAM_BITS = [15, 15]
  static LOCN_BITS = [14, 9]
  static IDEN_BITS = [8, 3]
  static TYPE_BITS = [2, 0]

  // Constructor
  constructor({ team, location, type }) {
    super(
      team << ChessPiece.TEAM_BITS[1] |
      location << ChessPiece.LOCN_BITS[1] |
      location << ChessPiece.IDEN_BITS[1] | // ID for the piece is its initial location
      type << ChessPiece.TYPE_BITS[1]
    )
  }

  // Accessor
  bits(start, end) { return (this & (mask(start - end + 1) << end)) >> end }

  // Meta
  team() { return this.bits(...ChessPiece.TEAM_BITS) }
  locn() { return this.bits(...ChessPiece.LOCN_BITS) }
  iden() { return this.bits(...ChessPiece.IDEN_BITS) }
  type() { return this.bits(...ChessPiece.TYPE_BITS) }

  // Orientation
  orient() { return this.team() ? 1 : -1 }

  // Movement
  static moves = {
    CARDINALS: [
      ChessPiece.prototype.left = function (d = 1) { return guardWrap(this.locn(), this.locn() + 1 * d * this.orient()) },
      ChessPiece.prototype.right = function (d = 1) { return this.left(this.locn(), -1 * d) },
      ChessPiece.prototype.forward = function (d = 1) { return guardBound(this.locn() + 8 * d * this.orient()) },
      ChessPiece.prototype.backward = function (d = 1) { return this.forward(this.locn(), -1 * d) },
    ],
    DIAGONALS: [
      ChessPiece.prototype.forwardLeft = function (d = 1) { return this.left(this.forward(this.locn(), d), d) },
      ChessPiece.prototype.forwardRight = function (d = 1) { return this.right(this.forward(this.locn(), d), d) },
      ChessPiece.prototype.backwardLeft = function (d = 1) { return this.left(this.backward(this.locn(), d), d) },
      ChessPiece.prototype.backwardRight = function (d = 1) { return this.right(this.backward(this.locn(), d), d) },
    ]
  }
}
