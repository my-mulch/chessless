import ChessPiece from "./Piece";

export default class King extends ChessPiece {
  static limit = 1
  static moves = [King.prototype.castles, ChessPiece.moves.DIAGONALS, ChessPiece.moves.CARDINALS].flat()

  castles(game, s, check) {
    if (check) return null

    const kr = [0, 0, 0].reduce(this.kingside.bind(this), s)
    const qr = [0, 0, 0, 0].reduce(this.queenside.bind(this), s)

    const { WHITE_KING: wk, WHITE_QUEEN: wq, BLACK_KING: bk, BLACK_QUEEN: bq } = ChessPiece

    const [k, r, side] = (
      (s == 60 && kr == 63 && [s, kr, wk]) || (s == 4 && kr == 7 && [s, kr, bk]) ||
      (s == 60 && qr == 56 && [s, qr, wq]) || (s == 4 && qr == 0 && [s, qr, bq]) || []
    )

    if (!side || !game.castles.includes(side)) return null
  }

  constructor(team, id) { super(team, id, ChessPiece.KING) }
}
