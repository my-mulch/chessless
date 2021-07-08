import ChessPiece from "./Piece";

export default class Queen extends ChessPiece {
  moves = [ChessPiece.moves.CARDINALS, ChessPiece.moves.DIAGONALS].flat()
  captures = this.moves

  constructor({ team, location }) {
    super({ team, location, type: ChessPiece.QUEEN })
  }
}