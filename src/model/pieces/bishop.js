import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game) {
        ChessMove.find(game, ChessPiece.moveForwardLeft)
        ChessMove.find(game, ChessPiece.moveForwardRight)
        ChessMove.find(game, ChessPiece.moveBackwardLeft)
        ChessMove.find(game, ChessPiece.moveBackwardRight)
    }
}
