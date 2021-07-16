import ChessPiece from "./Piece";

export default class Bishop extends ChessPiece {
  static limit = 8
  static moves = ChessPiece.moves.DIAGONALS

  constructor(team, id) { super(team, id, ChessPiece.BISHOP) }
}