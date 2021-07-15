import { parseFEN, STARTING_FEN } from "./utils"
import { PieceMap, ChessPiece } from './pieces'

export default class ChessGame {
  // States
  static FOUND_CHECK = 0
  static EMPTY_SQUARE = 1
  static MOVES_EXHAUSTED = 2
  static PUTS_KING_IN_CHECK = 3
  static CAPTURE_OPPORTUNITY = 4

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

  // Helpers
  sameTeam(square1, square2) { return this.board[square1] && this.board[square2] && this.board[square1].team() === this.board[square2].team() }
  otherTeam(square1, square2) { return this.board[square1] && this.board[square2] && this.board[square1].team() !== this.board[square2].team() }

  // Actions
  move(candidateMove) {
    // If we run into our teammate, there are no more moves to consider in this direction
    if (this.sameTeam(candidateMove.start, candidateMove.end))
      return ChessGame.MOVES_EXHAUSTED

    // if we put the king in check with this move, it's not valid
    if (this.putsKingInCheck(candidateMove))
      return ChessGame.PUTS_KING_IN_CHECK

    // If we encouter the other team and can capture
    if (this.otherTeam(candidateMove.start, candidateMove.end) && this.canCapture(candidateMove))
      return ChessGame.CAPTURE_OPPORTUNITY

    // If we encounter the other team but can't capture
    if (this.otherTeam(candidateMove.start, candidateMove.end))
      return ChessGame.MOVES_EXHAUSTED

    // Otherwise we have an empty square
    return ChessGame.EMPTY_SQUARE
  }

  check(candidateMove) {

  }

  // Get moves with a particular action
  getMoves(action = this.move) {
    const moves = []

    for (let s = 0; s < this.board.length; s++) {
      const piece = this.board[s]

      if (!piece || piece.team() !== this.turn) continue

      for (move of piece.constructor.moves) {
        for (const candidateMove of ChessMove.generator(this, piece, move, s)) {
          switch (action.call(this, candidateMove)) {
            case ChessGame.FOUND_CHECK: return true // only found when action is `this.check`

            // states for action: `this.move`
            case ChessGame.MOVES_EXHAUSTED: break
            case ChessGame.PUTS_KING_IN_CHECK: continue
            case ChessGame.EMPTY_SQUARE: moves.push(candidateMove); continue
            case ChessGame.CAPTURE_OPPORTUNITY: moves.push(candidateMove); break
          }
        }
      }
    }

    return moves
  }

  clone() { return new ChessGame({ game: this }) }
}