import ChessPiece from "./Piece";

export default class Rook extends ChessPiece {
  static limit = 8
  static moves = ChessPiece.moves.CARDINALS
  static captures = ChessPiece.moves.CARDINALS

  constructor(team, id) {
    super(team, id, ChessPiece.ROOK)
  }
}