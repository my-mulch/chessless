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

    static getMoves(game, moves, from) {
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopForwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopForwardRight, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopRightForward, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopRightBackward, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopBackwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopBackwardRight, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopLeftForward, steps: 1 })
        ChessMove.find({ type: ChessMove.KNIGHT, game, moves, from, movement: Knight.hopLeftBackward, steps: 1 })
    }
}
