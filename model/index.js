import ChessMove from "./move"
import { parseFEN, STARTING_FEN } from "./utils"
import { PieceMap, ChessPiece } from './pieces'

export default class ChessGame {
  // Constructors
  constructor({ FEN, game } = { FEN: STARTING_FEN, game: null }) {
    game ? this.copyConstructor(game) : this.fenConstructor(FEN)
  }

  fenConstructor(FEN) {
    const [board, turn, castles, enpassant] = parseFEN(FEN)

    // Metadata
    this.castles = castles
    this.enpassant = enpassant
    this.turn = ChessPiece.getTeamFromFENTeam(turn)

    this.board = board.map((piece, location) => (
      piece ? new PieceMap[piece](ChessPiece.getTeamFromFENPiece(piece), location) : null
    ))
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.castles = game.castles
    this.enpassant = game.enpassant

    this.board = game.board.slice()
  }

  changeTurns() {
    this.turn = +!this.turn
    return this
  }

  kingIsInCheck(square) {
    this.changeTurns()
    const check = this.getMoves({ check: true }).some(move => move.end === square)
    this.changeTurns()

    return check
  }

  getMoves({ check } = { check: false }) {
    const verifieds = []

    this.board.forEach((piece, start) => {
      if (!piece || piece.team() !== this.turn) return

      debugger

      piece.moves.forEach(candidate => {
        for (const candidateMove of ChessMove.generator({ game: this, piece, candidate, start, check })) {
          if (candidateMove.outOfBounds()) { continue }
          if (candidateMove.runsIntoTeammate(this)) { continue }
          if (!check && candidateMove.putsOwnKingInCheck(this)) { continue }
          if (candidateMove.canMove(this)) { verifieds.push(candidateMove); continue }
          if (candidateMove.canCapture(this)) { verifieds.push(candidateMove); break }
          break
        }
      })
    }, this)

    return verifieds
  }

  clone() { return new ChessGame({ game: this }) }
}
