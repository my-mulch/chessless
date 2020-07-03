import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Rook {
    static getMoves(game) {
        ChessMove.find(game, ChessPiece.moveLeft)
        ChessMove.find(game, ChessPiece.moveRight)
        ChessMove.find(game, ChessPiece.moreForward)
        ChessMove.find(game, ChessPiece.moveBackward)
    }
}
