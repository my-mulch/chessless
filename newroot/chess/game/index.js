import PieceMap from '../pieces'
import ChessPiece from './piece.js'
import { parseFEN, STARTING_FEN } from "../utils.js"

export default class ChessGame {
  static createPieces(piece) {
    if (!piece) return null

    // What type of piece is it? Grab the associated class from the PieceMap.
    const Piece = PieceMap[piece]

    // Create the new piece for the appropriate team
    return new Piece(ChessPiece.getTeam(piece))
  }

  constructor({ FEN = STARTING_FEN, game }) {
    if (game) this.copyConstructor(game)
    else this.fenConstructor(FEN)
  }

  fenConstructor(FEN) {
    const [board, turn] = parseFEN(FEN)

    // Whose turn is it?
    this.turn = turn

    // Record the history
    this.previousMoves = []
    this.previousBoards = []
    this.previouslyMovedPieces = new Set()

    // Convert the board of strings to board of piece objects
    this.board = board.map(ChessGame.createPieces)
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.board = game.board.map(ChessGame.createPieces)
    this.previousMoves = game.previousMoves.slice()
    this.previousBoards = game.previousBoards.slice()
    this.previouslyMovedPieces = new Set(game.previouslyMovedPieces)
  }

  getLastMove() {
    return this.previousMoves[this.previousMoves.length]
  }
}
