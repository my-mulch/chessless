import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Rook {
    static getMoves(game, moves, isAttacking, from) {
        const find = ChessMove.find.bind(
            null, // context
            ChessMove.ROOK, // move type
            game, // game
            moves, // moveslist
            isAttacking, // movestyle
            from // from position
        )

        find(ChessPiece.moveLeft)
        find(ChessPiece.moveRight)
        find(ChessPiece.moreForward)
        find(ChessPiece.moveBackward)
    }
}
