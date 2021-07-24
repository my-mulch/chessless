import ChessMove from "../move";
import ChessPiece from ".";

export default class Rook extends ChessPiece {
  static moves = this.CARDINALS.map(ChessMove.special(this.prototype.revokeCastles))

  constructor(fen, location) {
    super(fen)
    
    switch (location) {
      case 0: this.rights = ChessPiece.BLACK_QUEEN; break
      case 7: this.rights = ChessPiece.BLACK_KING; break
      case 56: this.rights = ChessPiece.WHITE_QUEEN; break
      case 63: this.rights = ChessPiece.WHITE_KING; break
    }
  }
}
