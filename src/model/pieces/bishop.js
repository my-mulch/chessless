import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop extends ChessPiece {
    getMoves(game) {
        ChessMove.find(game, this.moveForwardLeft.bind(this))
        ChessMove.find(game, this.moveForwardRight.bind(this))
        ChessMove.find(game, this.moveBackwardLeft.bind(this))
        ChessMove.find(game, this.moveBackwardRight.bind(this))
    }
}
