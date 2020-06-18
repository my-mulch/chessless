import ChessMove from '../move'
import ChessPiece from '../piece'

export default class King {
    static getMoves(game, from) {
        ChessMove.move(game, from, ChessPiece.left, 1)
        ChessMove.move(game, from, ChessPiece.right, 1)
        ChessMove.move(game, from, ChessPiece.forward, 1)
        ChessMove.move(game, from, ChessPiece.backward, 1)
        ChessMove.move(game, from, ChessPiece.forwardLeft, 1)
        ChessMove.move(game, from, ChessPiece.forwardRight, 1)
        ChessMove.move(game, from, ChessPiece.backwardLeft, 1)
        ChessMove.move(game, from, ChessPiece.backwardRight, 1)
    }
}
