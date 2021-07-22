import ChessPiece from "./Piece";

export default class Bishop extends ChessPiece {
  static limit = 8
  moves = ChessPiece.moves.DIAGONALS

  constructor(team, id) { super(team, id, ChessPiece.BISHOP) }
}