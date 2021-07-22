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
      if (!piece) return null

      switch (piece.toLowerCase()) {
        case ChessPiece.KING: return new King(piece, location)
        case ChessPiece.PAWN: return new Pawn(piece, location)
        case ChessPiece.ROOK: return new Rook(piece, location)
        case ChessPiece.QUEEN: return new Queen(piece, location)
        case ChessPiece.KNIGHT: return new Knight(piece, location)
        case ChessPiece.BISHOP: return new Bishop(piece, location)
      }
    })
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
