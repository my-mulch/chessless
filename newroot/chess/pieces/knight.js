import ChessPiece from '../piece.js'

export default class Knight extends ChessPiece {
    constructor(team) { super(ChessPiece.KNIGHT, team) }
    
    hopForwardLeft(from) { return this.moveLeft(this.moveForward(from, 2)) }
    hopForwardRight(from) { return this.moveRight(this.moveForward(from, 2)) }
    hopRightForward(from) { return this.moveForward(this.moveRight(from, 2)) }
    hopRightBackward(from) { return this.moveBackward(this.moveRight(from, 2)) }
    hopBackwardLeft(from) { return this.moveLeft(this.moveBackward(from, 2)) }
    hopBackwardRight(from) { return this.moveRight(this.moveBackward(from, 2)) }
    hopLeftForward(from) { return this.moveForward(this.moveLeft(from, 2)) }
    hopLeftBackward(from) { return this.moveBackward(this.moveLeft(from, 2)) }

    getMoves(square, board, history) {
        return [
            ...super.getMoves(square, board, history, this.hopForwardLeft.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopForwardRight.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopRightForward.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopRightBackward.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopBackwardLeft.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopBackwardRight.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopLeftForward.bind(this), 1),
            ...super.getMoves(square, board, history, this.hopLeftBackward.bind(this), 1)
        ]
    }
}
