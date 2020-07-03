import ChessMove from '../move'
import ChessPiece from '../piece'

export default class King {
    static getMoves(game) {
        ChessMove.find(game, ChessPiece.moveLeft, 1)
        ChessMove.find(game, ChessPiece.moveRight, 1)
        ChessMove.find(game, ChessPiece.moveForward, 1)
        ChessMove.find(game, ChessPiece.moveBackward, 1)
        ChessMove.find(game, ChessPiece.moveForwardLeft, 1)
        ChessMove.find(game, ChessPiece.moveForwardRight, 1)
        ChessMove.find(game, ChessPiece.moveBackwardLeft, 1)
        ChessMove.find(game, ChessPiece.moveBackwardRight, 1)
    }
}
