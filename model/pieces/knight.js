import ChessPiece from ".";

export default class Knight extends ChessPiece {
  static limit = 1
  static moves = [
    Knight.prototype.hopLeftForward = function (s) { return this.forward(this.left(this.left(s))) },
    Knight.prototype.hopForwardLeft = function (s) { return this.left(this.forward(this.forward(s))) },
    Knight.prototype.hopLeftBackward = function (s) { return this.backward(this.left(this.left(s))) },
    Knight.prototype.hopBackwardLeft = function (s) { return this.left(this.backward(this.backward(s))) },
    Knight.prototype.hopRightForward = function (s) { return this.forward(this.right(this.right(s))) },
    Knight.prototype.hopForwardRight = function (s) { return this.right(this.forward(this.forward(s))) },
    Knight.prototype.hopRightBackward = function (s) { return this.backward(this.right(this.right(s))) },
    Knight.prototype.hopBackwardRight = function (s) { return this.right(this.backward(this.backward(s))) },
  ]
}