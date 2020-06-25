import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Knight {
    static hopForwardLeft(piece, from) { return ChessPiece.left(piece, ChessPiece.forward(piece, from, 2)) }
    static hopForwardRight(piece, from) { return ChessPiece.right(piece, ChessPiece.forward(piece, from, 2)) }
    static hopRightForward(piece, from) { return ChessPiece.forward(piece, ChessPiece.right(piece, from, 2)) }
    static hopRightBackward(piece, from) { return ChessPiece.backward(piece, ChessPiece.right(piece, from, 2)) }
    static hopBackwardLeft(piece, from) { return ChessPiece.left(piece, ChessPiece.backward(piece, from, 2)) }
    static hopBackwardRight(piece, from) { return ChessPiece.right(piece, ChessPiece.backward(piece, from, 2)) }
    static hopLeftForward(piece, from) { return ChessPiece.forward(piece, ChessPiece.left(piece, from, 2)) }
    static hopLeftBackward(piece, from) { return ChessPiece.backward(piece, ChessPiece.left(piece, from, 2)) }

    static getMoves(game, from) {
        ChessMove.find(game, from, Knight.hopForwardLeft, 1)
        ChessMove.find(game, from, Knight.hopForwardRight, 1)
        ChessMove.find(game, from, Knight.hopRightForward, 1)
        ChessMove.find(game, from, Knight.hopRightBackward, 1)
        ChessMove.find(game, from, Knight.hopBackwardLeft, 1)
        ChessMove.find(game, from, Knight.hopBackwardRight, 1)
        ChessMove.find(game, from, Knight.hopLeftForward, 1)
        ChessMove.find(game, from, Knight.hopLeftBackward, 1)
    }
}
