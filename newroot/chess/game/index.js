import PieceMap from '../pieces'
import { parseFEN, STARTING_FEN } from "../utils.js"

export default class ChessGame {
  constructor(FEN = STARTING_FEN) {
    const [board, turn] = parseFEN(FEN)
    
    this.turn = turn
    this.board = board.map((piece) => {
      if (!piece) return null

      // What type of piece is it? Grab the associated class from the PieceMap.
      // Lowercase because we are just interested in piece type
      const Piece = PieceMap[piece.toLowerCase()]

      // Create the new piece but preserve casing so we know which team it's on!
      return new Piece(piece)
    })
  }
}
