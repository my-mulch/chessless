import ChessMove from "../move";
import ChessPiece from ".";

export default class Rook extends ChessPiece {
  static moves = this.CARDINALS.map(ChessMove.special(this.revokeCastles))

  constructor(fen, location) {
    super(fen)

    if (location === 0) return this.castlingRights = ChessPiece.BLACK_QUEEN
    if (location === 7) return this.castlingRights = ChessPiece.BLACK_KING
    if (location === 56) return this.castlingRights = ChessPiece.WHITE_QUEEN
    if (location === 63) return this.castlingRights = ChessPiece.WHITE_KING
  }
}
