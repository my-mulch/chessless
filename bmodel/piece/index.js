/* eslint-disable lines-between-class-members */
export default class ChessPiece {
  // FEN symbols
  static WHITE = 'w'; static BLACK = 'b'
  static ROOK = 'r'; static WHITE_ROOK = 'R'; static BLACK_ROOK = 'r'
  static PAWN = 'p'; static WHITE_PAWN = 'P'; static BLACK_PAWN = 'p'
  static KING = 'k'; static WHITE_KING = 'K'; static BLACK_KING = 'k'
  static QUEEN = 'q'; static WHITE_QUEEN = 'Q'; static BLACK_QUEEN = 'q'
  static KNIGHT = 'n'; static WHITE_KNIGHT = 'N'; static BLACK_KNIGHT = 'n'
  static BISHOP = 'b'; static WHITE_BISHOP = 'B'; static BLACK_BISHOP = 'b'

  // FEN helpers
  static getTeamFromFEN(piece) { return piece.toLowerCase() === piece ? this.BLACK : this.WHITE; }
  static getOtherTeamFEN(team) { return team === this.WHITE ? this.BLACK : this.WHITE; }
}
