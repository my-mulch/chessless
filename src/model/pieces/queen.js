import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen {
    static getMoves(game, moves, isAttacking, from) {
        const find = ChessMove.find.bind(
            null, // context
            ChessMove.QUEEN, // move type
            game, // game
            moves, // moveslist
            isAttacking, // movestyle
            from // from position
        )

        find(ChessPiece.moveLeft)
        find(ChessPiece.moveRight)
        find(ChessPiece.moveForward)
        find(ChessPiece.moveBackward)
        find(ChessPiece.moveForwardLeft)
        find(ChessPiece.moveForwardRight)
        find(ChessPiece.moveBackwardLeft)
        find(ChessPiece.moveBackwardRight)
    }
}
