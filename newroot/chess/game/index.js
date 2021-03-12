import { getTeam, parseFEN, STARTING_FEN } from "../utils.js"
import { Bishop, Rook, Pawn, King, Queen, Knight } from "../pieces"

export default class ChessGame {
  static pieceMap = { r: Rook, n: Knight, b: Bishop, q: Queen, k: King, p: Pawn }

  static getMoves(board, team) {
    const moves = {}

    board.forEach((piece, square) => {
      if (!piece || getTeam(piece) !== team) return

      moves[square] = ChessGame.pieceMap[piece.toLowerCase()].getMoves(piece, square, team)
    })
  }

  constructor(FEN = STARTING_FEN) {
    const [board, turn] = parseFEN(FEN)
    this.board = board
    this.turn = turn
  }
}
