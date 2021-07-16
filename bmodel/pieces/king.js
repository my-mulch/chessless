import ChessMove from "../move";
import ChessPiece from "./Piece";

export default class King extends ChessPiece {
  static limit = 1
  static moves = [King.prototype.castles, ChessPiece.moves.DIAGONALS, ChessPiece.moves.CARDINALS].flat()

  castles(game, s, check) {
    if (check) return null

    const { WHITE_KING: wk, WHITE_QUEEN: wq, BLACK_KING: bk, BLACK_QUEEN: bq } = ChessPiece

    const kr = [0, 0, 0].reduce(this.kingside.bind(this), s)
    const qr = [0, 0, 0, 0].reduce(this.queenside.bind(this), s)

    const [side, traverse] = (
      (s == 60 && kr == 63 && [wk, [60, 61, 62, 63]]) || (s == 60 && qr == 56 && [wq, [60, 59, 58, 57, 56]]) ||
      (s == 04 && kr == 07 && [bk, [04, 05, 06, 07]]) || (s == 04 && qr == 00 && [bq, [04, 03, 02, 01, 00]]) || []
    )

    if (!side || !game.castles.includes(side)) return null
    if (!traverse.slice(1, -1).every(game.empty, game)) return null
    if (traverse.slice(0, 3).some(game.kingIsInCheck, game)) return null

    return new ChessMove({
      start: s,
      end: traverse[2],
      piece: this,
      empty: true,
      special: game => {
        game.board[traverse[1]] = game.board[traverse[traverse.length - 1]]
        game.board[traverse[traverse.length - 1]] = null
      }
    })
  }

  constructor(team, id) { super(team, id, ChessPiece.KING) }
}
