import ChessMove from "../move"
import ChessPiece from "."

import Rook from "./rook"
import Queen from "./queen"
import Bishop from "./bishop"
import Knight from "./knight"

const { ROOK: r, BISHOP: b, QUEEN: q, KNIGHT: n } = ChessPiece

export default class Pawn extends ChessPiece {
  static limit = 1
  static moves = [Pawn.prototype.push, Pawn.prototype.doublePush, Pawn.prototype.capture]

  // Promotions
  promotions({ start, end, capture = false, empty = false, checking }) {
    return [[Rook, r], [Queen, q], [Knight, n], [Bishop, b]].map(([Piece, type]) => new ChessMove({
      start, end, piece: this, capture, empty, checking,
      special: game => game.board[end] = new Piece(ChessPiece.assignTeamForFEN(type, this.team()))
    }))
  }

  // Enpassant
  enpassant({ game, start, end, side, checking }) {
    return game.enpassant !== end ? [] : [new ChessMove({
      start, end, piece: this, empty: true, checking,
      special: game => game.board[side] = null
    })]
  }

  // Pushes
  push(_, start, checking) {
    const end = this.forward(start)

    if (this.lastRank(end)) return this.promotions({ start, end, empty: true, checking })

    return [new ChessMove({ start, end, piece: this, empty: true })]
  }

  doublePush(game, start, checking) {
    const step = this.forward(start)
    const end = this.forward(step)

    if (game.board[step] || !this.secondRank(start)) return []

    return [new ChessMove({
      start, end, piece: this, empty: true, checking, special: game => game.enpassant = step
    })]
  }

  // Captures
  capture(game, start, checking) {
    const forwardLeft = this.forwardLeft(start)
    const forwardRight = this.forwardRight(start)

    if (this.lastRank(this.forward(start)))
      return [
        this.promotions({ start, end: forwardLeft, capture: true }),
        this.promotions({ start, end: forwardRight, capture: true })
      ].flat()

    return [
      this.enpassant({ game, start, end: forwardLeft, side: this.left(start) }),
      this.enpassant({ game, start, end: forwardRight, side: this.right(start) }),
      new ChessMove({ start, end: forwardLeft, piece: this, capture: true, checking }),
      new ChessMove({ start, end: forwardRight, piece: this, capture: true, checking })
    ].flat()
  }
}
