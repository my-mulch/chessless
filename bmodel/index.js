import { parseFEN, STARTING_FEN } from "./utils"
import { PieceMap, ChessPiece } from './pieces'

export default class ChessGame {
  // Constructors
  constructor({ FEN = STARTING_FEN, game }) {
    if (game) this.copyConstructor(game)
    else this.fenConstructor(FEN)
  }

  fenConstructor(FEN) {
    const [board, turn, castles, enpassant] = parseFEN(FEN)

    // Metadata
    this.turn = turn
    this.castles = castles
    this.enpassant = enpassant

    // Record the history
    this.moves = []
    this.boards = []

    // Map the board of strings into a board of piece objects
    this.board = board.map((piece, location) => {
      if (!piece) return null

      // Grab the class from the PieceMap
      const Piece = PieceMap[piece]

      // Create the new piece for the appropriate team
      return new Piece(ChessPiece.getTeamFromFEN(piece), location)
    })
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.castles = game.castles
    this.enpassant = game.enpassant

    this.moves = game.moves.slice()
    this.board = game.board.slice()
    this.boards = game.boards.slice()
  }

  consider({ start, piece, candidates, verifieds, check }) {
    for (candidate of candidates) {
      for (const candidateMove of ChessMove.generator({ game: this, piece, candidate, start })) {
        if (candidateMove.outOfBounds()) { break }
        if (candidateMove.runsIntoTeammate(this)) { break }
        if (!check && candidateMove.putsOwnKingInCheck(this)) { continue }
        if (candidateMove.canMove(this)) { verifieds.push(candidateMove); continue }
        if (candidateMove.canCapture(this)) { verifieds.push(candidateMove); break }
        break
      }
    }
  }

  getMoves() {
    const verifieds = []

    for (let square = 0; square < this.board.length; square++) {
      const piece = this.board[square]
      if (!piece || piece.team() !== this.turn) continue
      this.consider({ square, piece, candidates: piece.constructor.moves, verifieds })
    }

    return verifieds
  }

  clone() { return new ChessGame({ game: this }) }
}
