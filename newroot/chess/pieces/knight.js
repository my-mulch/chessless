import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Knight extends ChessPiece {
    hopForwardLeft(from) { return this.moveLeft(this.moveForward(from, 2)) }
    hopForwardRight(from) { return this.moveRight(this.moveForward(from, 2)) }
    hopRightForward(from) { return this.moveForward(this.moveRight(from, 2)) }
    hopRightBackward(from) { return this.moveBackward(this.moveRight(from, 2)) }
    hopBackwardLeft(from) { return this.moveLeft(this.moveBackward(from, 2)) }
    hopBackwardRight(from) { return this.moveRight(this.moveBackward(from, 2)) }
    hopLeftForward(from) { return this.moveForward(this.moveLeft(from, 2)) }
    hopLeftBackward(from) { return this.moveBackward(this.moveLeft(from, 2)) }

    getMoves(game) {
        ChessMove.find(game, this.hopForwardLeft.bind(this), 1)
        ChessMove.find(game, this.hopForwardRight.bind(this), 1)
        ChessMove.find(game, this.hopRightForward.bind(this), 1)
        ChessMove.find(game, this.hopRightBackward.bind(this), 1)
        ChessMove.find(game, this.hopBackwardLeft.bind(this), 1)
        ChessMove.find(game, this.hopBackwardRight.bind(this), 1)
        ChessMove.find(game, this.hopLeftForward.bind(this), 1)
        ChessMove.find(game, this.hopLeftBackward.bind(this), 1)
    }
}
