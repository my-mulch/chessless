import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game, from) {
        ChessMove.move(game, from, ChessPiece.forwardLeft)
        ChessMove.move(game, from, ChessPiece.forwardRight)
        ChessMove.move(game, from, ChessPiece.backwardLeft)
        ChessMove.move(game, from, ChessPiece.backwardRight)
    }
}
