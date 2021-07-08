import ChessPiece from "./Piece";

export default class King extends ChessPiece {
  moves = [ChessPiece.moves.DIAGONALS, ChessPiece.moves.CARDINALS].flat()
  captures = this.moves

  constructor({ team, location }) {
    super({ team, location, type: ChessPiece.KING })
  }
}