import ChessPiece from "./Piece";

export default class Rook extends ChessPiece {
  moves = ChessPiece.moves.CARDINALS
  captures = this.moves

  constructor({ team, location }) {
    super({ team, location, type: ChessPiece.ROOK })
  }
}