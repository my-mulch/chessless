import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen {
    static getMoves(game) {
        ChessMove.find(game, ChessPiece.moveLeft)
        ChessMove.find(game, ChessPiece.moveRight)
        ChessMove.find(game, ChessPiece.moveForward)
        ChessMove.find(game, ChessPiece.moveBackward)
        ChessMove.find(game, ChessPiece.moveForwardLeft)
        ChessMove.find(game, ChessPiece.moveForwardRight)
        ChessMove.find(game, ChessPiece.moveBackwardLeft)
        ChessMove.find(game, ChessPiece.moveBackwardRight)
    }
}
