import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Rook {
    static getMoves(game, from) {
        ChessMove.find(game, from, ChessPiece.left)
        ChessMove.find(game, from, ChessPiece.right)
        ChessMove.find(game, from, ChessPiece.forward)
        ChessMove.find(game, from, ChessPiece.backward)
    }
}
