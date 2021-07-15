import ChessPiece from "./Piece";

export default class King extends ChessPiece {
  static limit = 1
  static moves = [ChessPiece.moves.DIAGONALS, ChessPiece.moves.CARDINALS].flat()
  static canCapture = [ChessPiece.moves.DIAGONALS, ChessPiece.moves.CARDINALS].flat()

  constructor(team, id) {
    super(team, id, ChessPiece.KING)
  }
}
