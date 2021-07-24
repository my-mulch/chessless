import ChessPiece from ".";

export default class Queen extends ChessPiece { static moves = [...this.CARDINALS, ...this.DIAGONALS] }