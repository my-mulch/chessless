import ChessPiece from "./Piece";

export default class Bishop extends ChessPiece {
  moves = ChessPiece.moves.DIAGONALS
  captures = this.moves
  
  constructor({ team, location }) {
    super({ team, location, type: ChessPiece.BISHOP })
  }
}