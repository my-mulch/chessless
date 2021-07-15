import ChessPiece from "./Piece";

export default class King extends ChessPiece {
  static limit = 1
  static moves = [this.castles, ChessPiece.moves.DIAGONALS, ChessPiece.moves.CARDINALS].flat()

  castles = (game, s) => {
    const kr = [1, 2, 3].reduce(this.kingside.bind(this), s)
    const qr = [1, 2, 3, 4].reduce(this.queenside.bind(this), s)

    const { WHITE_KING: wk, WHITE_QUEEN: wq, BLACK_KING: bk, BLACK_QUEEN: bq } = ChessPiece

    const [k, r, side] = (
      (kr == 63 && s == 60 && [kr, s, wk]) || (kr == 7 && s == 4 && [qr, s, bk]) ||
      (qr == 56 && s == 60 && [qr, s, wq]) || (qr == 0 && s == 4 && [kr, s, bq]) || []
    )

    if (!side || !game.castles.includes(side)) return null
  }

  constructor(team, id) {
    super(team, id, ChessPiece.KING)
  }
}
