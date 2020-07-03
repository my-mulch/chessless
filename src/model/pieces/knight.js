import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Knight {
    static hopForwardLeft(piece, from) { return ChessPiece.moveLeft(piece, ChessPiece.moveForward(piece, from, 2)) }
    static hopForwardRight(piece, from) { return ChessPiece.moveRight(piece, ChessPiece.moveForward(piece, from, 2)) }
    static hopRightForward(piece, from) { return ChessPiece.moveForward(piece, ChessPiece.moveRight(piece, from, 2)) }
    static hopRightBackward(piece, from) { return ChessPiece.moveBackward(piece, ChessPiece.moveRight(piece, from, 2)) }
    static hopBackwardLeft(piece, from) { return ChessPiece.moveLeft(piece, ChessPiece.moveBackward(piece, from, 2)) }
    static hopBackwardRight(piece, from) { return ChessPiece.moveRight(piece, ChessPiece.moveBackward(piece, from, 2)) }
    static hopLeftForward(piece, from) { return ChessPiece.moveForward(piece, ChessPiece.moveLeft(piece, from, 2)) }
    static hopLeftBackward(piece, from) { return ChessPiece.moveBackward(piece, ChessPiece.moveLeft(piece, from, 2)) }

    static getMoves(game) {
        ChessMove.find(game, Knight.hopForwardLeft, 1)
        ChessMove.find(game, Knight.hopForwardRight, 1)
        ChessMove.find(game, Knight.hopRightForward, 1)
        ChessMove.find(game, Knight.hopRightBackward, 1)
        ChessMove.find(game, Knight.hopBackwardLeft, 1)
        ChessMove.find(game, Knight.hopBackwardRight, 1)
        ChessMove.find(game, Knight.hopLeftForward, 1)
        ChessMove.find(game, Knight.hopLeftBackward, 1)
    }
}
