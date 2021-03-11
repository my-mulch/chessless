import { parseFEN, STARTING_FEN } from "../utils.js"

export default class ChessGame {
  constructor(FEN = STARTING_FEN) {
    const [board, turn] = parseFEN(FEN)
    this.board = board
    this.turn = turn
  }
}
