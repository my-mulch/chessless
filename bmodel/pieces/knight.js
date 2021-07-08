import ChessPiece from "./Piece";

export default class Knight extends ChessPiece {
  moves = [
    ChessPiece.prototype.hopLeftForward = function () { return this.forward(this.left(this.locn(), 2)) },
    ChessPiece.prototype.hopForwardLeft = function () { return this.left(this.forward(this.locn(), 2)) },
    ChessPiece.prototype.hopLeftBackward = function () { return this.backward(this.left(this.locn(), 2)) },
    ChessPiece.prototype.hopBackwardLeft = function () { return this.left(this.backward(this.locn(), 2)) },
    ChessPiece.prototype.hopRightForward = function () { return this.forward(this.right(this.locn(), 2)) },
    ChessPiece.prototype.hopForwardRight = function () { return this.right(this.forward(this.locn(), 2)) },
    ChessPiece.prototype.hopRightBackward = function () { return this.backward(this.right(this.locn(), 2)) },
    ChessPiece.prototype.hopBackwardRight = function () { return this.right(this.backward(this.locn(), 2)) },
  ]

  captures = this.moves

  constructor({ team, location }) {
    super({ team, location, type: ChessPiece.KNIGHT })
  }
}