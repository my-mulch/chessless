import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game, moves, isAttacking, from) {
        const find = ChessMove.find.bind(
            null, // context
            ChessMove.BISHOP, // move type
            game, // game
            moves, // moveslist
            isAttacking, // movestyle
            from // from position
        )

        find(ChessPiece.moveForwardLeft)
        find(ChessPiece.moveForwardRight)
        find(ChessPiece.moveBackwardLeft)
        find(ChessPiece.moveBackwardRight)
    }
}
