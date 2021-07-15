import ChessPiece from "./Piece";

export default class Queen extends ChessPiece {
  static limit = 8
  static moves = [ChessPiece.moves.CARDINALS, ChessPiece.moves.DIAGONALS].flat()
  static captures = [ChessPiece.moves.CARDINALS, ChessPiece.moves.DIAGONALS].flat()

  constructor(team, id) {
    super(team, id, ChessPiece.QUEEN)
  }
}