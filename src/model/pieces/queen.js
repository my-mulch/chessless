import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen {
    static getMoves(game, from) {
        ChessMove.find(game, from, ChessPiece.left)
        ChessMove.find(game, from, ChessPiece.right)
        ChessMove.find(game, from, ChessPiece.forward)
        ChessMove.find(game, from, ChessPiece.backward)
        ChessMove.find(game, from, ChessPiece.forwardLeft)
        ChessMove.find(game, from, ChessPiece.forwardRight)
        ChessMove.find(game, from, ChessPiece.backwardLeft)
        ChessMove.find(game, from, ChessPiece.backwardRight)
    }
}
