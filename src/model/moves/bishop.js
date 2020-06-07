import ChessPiece from '../piece'
import ChessMove from '../move'

export default class Bishop extends ChessPiece {
    getMoves(game, from) {
        return ChessMove.diagonals(game, this, from)
    }
}

