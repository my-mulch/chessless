import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen extends ChessPiece {
    getMoves(game) {
        ChessMove.find(game, this.moveLeft.bind(this))
        ChessMove.find(game, this.moveRight.bind(this))
        ChessMove.find(game, this.moveForward.bind(this))
        ChessMove.find(game, this.moveBackward.bind(this))
        ChessMove.find(game, this.moveForwardLeft.bind(this))
        ChessMove.find(game, this.moveForwardRight.bind(this))
        ChessMove.find(game, this.moveBackwardLeft.bind(this))
        ChessMove.find(game, this.moveBackwardRight.bind(this))
    }
}
