import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen {
    static getMoves(game, from) {
        ChessMove.move(game, from, ChessPiece.left)
        ChessMove.move(game, from, ChessPiece.right)
        ChessMove.move(game, from, ChessPiece.forward)
        ChessMove.move(game, from, ChessPiece.backward)
        ChessMove.move(game, from, ChessPiece.forwardLeft)
        ChessMove.move(game, from, ChessPiece.forwardRight)
        ChessMove.move(game, from, ChessPiece.backwardLeft)
        ChessMove.move(game, from, ChessPiece.backwardRight)
    }
}
