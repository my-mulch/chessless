import ChessPiece from "./Piece";

export default class Knight extends ChessPiece {
  static limit = 1
  static moves = ChessPiece.moves.KNIGHT

  constructor(team, id) { super(team, id, ChessPiece.KNIGHT) }
}