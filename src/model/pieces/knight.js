import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Knight {
    static hopForwardLeft(piece) { return ChessPiece.left(piece, ChessPiece.forward(piece, from, 2)) }
    static hopForwardRight(piece) { return ChessPiece.right(piece, ChessPiece.forward(piece, from, 2)) }
    static hopRightForward(piece) { return ChessPiece.forward(piece, ChessPiece.right(piece, from, 2)) }
    static hopRightBackward(piece) { return ChessPiece.backward(piece, ChessPiece.right(piece, from, 2)) }
    static hopBackwardLeft(piece) { return ChessPiece.left(piece, ChessPiece.backward(piece, from, 2)) }
    static hopBackwardRight(piece) { return ChessPiece.right(piece, ChessPiece.backward(piece, from, 2)) }
    static hopLeftForward(piece) { return ChessPiece.forward(piece, ChessPiece.left(piece, from, 2)) }
    static hopLeftBackward(piece) { return ChessPiece.backward(piece, ChessPiece.left(piece, from, 2)) }

    static getMoves(game, from) {
        ChessMove.move(game, from, Knight.hopForwardLeft, 1)
        ChessMove.move(game, from, Knight.hopForwardRight, 1)
        ChessMove.move(game, from, Knight.hopRightForward, 1)
        ChessMove.move(game, from, Knight.hopRightBackward, 1)
        ChessMove.move(game, from, Knight.hopBackwardLeft, 1)
        ChessMove.move(game, from, Knight.hopBackwardRight, 1)
        ChessMove.move(game, from, Knight.hopLeftForward, 1)
        ChessMove.move(game, from, Knight.hopLeftBackward, 1)
    }
}
