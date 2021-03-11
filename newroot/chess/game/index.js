import ChessPiece from "../pieces"
import { parseFEN, STARTING_FEN } from "../utils.js"

export default class ChessGame {
  static pieceMap = {
    r: Rook,
    n: Knight,
    b: Bishop,
    q: Queen,
    k: King,
    p: Pawn,
  }

  constructor(FEN = STARTING_FEN) {
    const [board, turn] = parseFEN(FEN)
    this.board = board
    this.turn = turn
  }

  getMoves() {
    const moves = {}

    this.board.forEach((piece, square) => {
      if (!piece || ChessPiece.getTeam(piece) !== this.turn) return

      moves[square] = pieceMap[piece.toLowerCase()].getMoves(piece, square, this.board)
    })
  }
}
