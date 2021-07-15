import ChessMove from "../move"
import ChessPiece from "./piece"

import Rook from "./rook"
import Queen from "./queen"
import Bishop from "./bishop"
import Knight from "./knight"

export default class Pawn extends ChessPiece {
  static moves = [this.push, this.doublePush, this.capture]
  static canCapture = [this.forwardLeft, this.forwardRight]

  // Promotions
  promotions = ({ start, end, capture = false, empty = false }) => (
    [Rook, Queen, Knight, Bishop].map(Piece => new ChessMove({
      start, end, piece: this, capture, empty,
      special: game => game.board[end] = new Piece(this.getTeam(), this.id)
    }))
  )

  // Enpassant
  enpassant = ({ game, start, end, side }) => (
    game.enpassant === side && new ChessMove({
      start, end, piece: this, empty: true,
      special: game => game.board[side] = null
    })
  )

  // Pushes
  push = (_, start) => {
    const end = this.forward(start)

    if (this.lastRank(end)) return this.promotions({ start, end, empty: true })

    return new ChessMove({ start, end, piece: this, empty: true })
  }

  doublePush = (game, start) => {
    const step = this.forward(start)
    const end = this.forward(step)

    if (game.board[step] || !this.secondRank(start)) return null

    return new ChessMove({ start, end, piece: this, empty: true, special: game => game.enpassant = step })
  }

  // Captures
  capture = (game, start) => {
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
      new ChessMove({ start, end: forwardLeft, piece: this, capture: true }),
      new ChessMove({ start, end: forwardRight, piece: this, capture: true })
    ].filter(Boolean)
  }

  constructor(team, id) {
    super(team, id, ChessPiece.PAWN)
  }
}
