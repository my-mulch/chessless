import ChessMove from "../move";
import ChessPiece from "./Piece";

const { WHITE_KING: wk, WHITE_QUEEN: wq, BLACK_KING: bk, BLACK_QUEEN: bq } = ChessPiece

export default class King extends ChessPiece {
  static limit = 1
  static moves = [
    King.prototype.castles,
    ...this.DIAGONALS.map(ChessMove.special(this.revokeCastles)),
    ...this.CARDINALS.map(ChessMove.special(this.revokeCastles))
  ]

  constructor(fen, location) {
    super(fen)

    if (location === 4) return this.rights = new RegExp(`${bk}|${bq}`, 'g')
    if (location === 60) return this.rights = new RegExp(`${wk}|${wq}`, 'g')
  }

  castles(game, s, check) {
    if (check) return null

    const kr = [0, 0, 0].reduce(this.kingside.bind(this), s)
    const qr = [0, 0, 0, 0].reduce(this.queenside.bind(this), s)

    const [side, traverse] = (
      (s == 4 && kr == 7 && [bk, [4, 5, 6, 7]]) ||
      (s == 4 && qr == 0 && [bq, [4, 3, 2, 1, 0]]) ||
      (s == 60 && kr == 63 && [wk, [60, 61, 62, 63]]) ||
      (s == 60 && qr == 56 && [wq, [60, 59, 58, 57, 56]]) || []
    )

    if (!side || !game.castles.includes(side)) return null
    if (!traverse.slice(1, -1).every(game.empty, game)) return null
    if (traverse.slice(0, 3).some(game.kingIsInCheck, game)) return null

    return new ChessMove({
      start: s, end: traverse[2], piece: this, empty: true,
      special: game => {
        game.board[traverse[1]] = game.board[traverse[traverse.length - 1]]
        game.board[traverse[traverse.length - 1]] = null
      }
    })
  }
}
