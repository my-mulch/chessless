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

    static getMoves(game, moves, isAttacking, from) {
        const find = ChessMove.find.bind(
            null, // context
            ChessMove.KNIGHT, // move type
            game, // game
            moves, // moveslist
            isAttacking, // movestyle
            from // from position
        )

        find(Knight.hopForwardLeft, 1)
        find(Knight.hopForwardRight, 1)
        find(Knight.hopRightForward, 1)
        find(Knight.hopRightBackward, 1)
        find(Knight.hopBackwardLeft, 1)
        find(Knight.hopBackwardRight, 1)
        find(Knight.hopLeftForward, 1)
        find(Knight.hopLeftBackward, 1)
    }
}
