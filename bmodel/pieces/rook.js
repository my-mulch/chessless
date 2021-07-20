import ChessPiece from "./Piece";

const { WHITE_KING: wk, WHITE_QUEEN: wq, BLACK_KING: bk, BLACK_QUEEN: bq } = ChessPiece

export default class Rook extends ChessPiece {
  static limit = 8

  moves = ChessPiece.moves.CARDINALS.map(this.revokeCastlingRights, this)
  castlingRights = this.isBlack() ? this.isKingside(this.id) ? bk : bq : this.isKingside(this.id) ? wk: wq

  revokeCastlingRights(move) {
    return (move.special = game => game.castles.replace(this.castlingRights, '')) && move
  }

  constructor(team, id) { super(team, id, ChessPiece.ROOK) }
}
