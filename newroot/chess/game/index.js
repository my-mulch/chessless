import PieceMap from '../pieces'
import { parseFEN, STARTING_FEN } from "../utils.js"

export default class ChessGame {
  constructor(FEN = STARTING_FEN) {
    const [board, turn] = parseFEN(FEN)

    this.board = board.map((piece) => piece ? new PieceMap[piece](piece) : null)
    this.turn = turn
  }

  static getMoves(board, team) {
    const moves = {}

    board.forEach((piece, square) => {
      if (piece && getTeam(piece.toString()) === team)
        moves[square] = piece.getMoves(piece, square, team)
    })
  }
}
