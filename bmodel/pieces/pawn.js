import ChessPiece from "./Piece";

export default class Pawn extends ChessPiece {
  moves = [
    ChessPiece.prototype.push = function () { return this.forward(1) },
    ChessPiece.prototype.doublePush = function () { return this.forward(2) }
  ]

  captures = [
    ChessPiece.prototype.forwardLeft,
    ChessPiece.prototype.forwardRight
  ]

  constructor({ team, location }) {
    super({ team, location, type: ChessPiece.PAWN })
  }
}
