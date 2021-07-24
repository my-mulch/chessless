import ChessMove from "./move"
import ChessPiece from './pieces'

import Rook from './pieces/rook'
import Pawn from './pieces/pawn'
import King from './pieces/king'
import Queen from './pieces/queen'
import Knight from './pieces/knight'
import Bishop from './pieces/bishop'

import { parseFEN, STARTING_FEN } from "./utils"

export default class ChessGame {
  // Constructors
  constructor({ FEN, game } = { FEN: STARTING_FEN, game: null }) {
    game ? this.copyConstructor(game) : this.fenConstructor(FEN)
  }

  fenConstructor(FEN) {
    const [board, turn, castles, enpassant] = parseFEN(FEN)

    // Metadata
    this.turn = turn
    this.castles = castles
    this.enpassant = enpassant

    this.board = board.map((piece, location) => {
      switch (piece.toLowerCase?.()) {
        case ChessPiece.KING: return new King(piece, location)
        case ChessPiece.PAWN: return new Pawn(piece, location)
        case ChessPiece.ROOK: return new Rook(piece, location)
        case ChessPiece.QUEEN: return new Queen(piece, location)
        case ChessPiece.KNIGHT: return new Knight(piece, location)
        case ChessPiece.BISHOP: return new Bishop(piece, location)
        default: return null
      }
    })
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.castles = game.castles
    this.enpassant = game.enpassant

    this.board = game.board.slice()
  }

  changeTurns() { this.turn = ChessPiece.otherTeamFEN(this.turn); return this }

  kingIsInCheck(square = null) {
    this.changeTurns()

    const check = this
      .getMoves({ checking: true })
      .some(({ end }) => end === square || this.board[end]?.toLowerCase() === ChessPiece.KING)

    this.changeTurns()

    return check
  }

  getMoves({ checking = false }) {
    const verifieds = []

    this.board.forEach((piece, start) => {
      if (piece.team?.() !== this.turn) return

      piece.moves.forEach(move => {
        const { candidates, sequential } = ChessMove.generator({ game: this, piece, move, start, checking })

        for (const candidate of candidates) {
          if (candidate.outOfBounds()) { if (sequential) break }
          if (candidate.runsIntoTeammate(this)) { if (sequential) break }
          if (!checking && candidate.putsOwnKingInCheck(this)) { if (sequential) continue }
          if (!checking && candidate.canMove(this)) { verifieds.push(candidate); if (sequential) continue }
          if (candidate.canCapture(this)) { verifieds.push(candidate); if (sequential) break }
        }
      })
    }, this)

    return verifieds
  }

  clone() { return new ChessGame({ game: this }) }
}
