import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Rook {
    static getMoves(game, from) {
        ChessMove.move(game, from, ChessPiece.left)
        ChessMove.move(game, from, ChessPiece.right)
        ChessMove.move(game, from, ChessPiece.forward)
        ChessMove.move(game, from, ChessPiece.backward)
    }
}
