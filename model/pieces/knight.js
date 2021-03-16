import ChessPiece from './piece'

export default class Knight extends ChessPiece {
    constructor(team, id) { super(ChessPiece.KNIGHT, team, id) }

    hopLeftForward(from) { return this.moveForward(this.moveLeft(from, 2)) }
    hopForwardLeft(from) { return this.moveLeft(this.moveForward(from, 2)) }
    hopLeftBackward(from) { return this.moveBackward(this.moveLeft(from, 2)) }
    hopBackwardLeft(from) { return this.moveLeft(this.moveBackward(from, 2)) }
    hopRightForward(from) { return this.moveForward(this.moveRight(from, 2)) }
    hopForwardRight(from) { return this.moveRight(this.moveForward(from, 2)) }
    hopRightBackward(from) { return this.moveBackward(this.moveRight(from, 2)) }
    hopBackwardRight(from) { return this.moveRight(this.moveBackward(from, 2)) }

    getMoves(game, square, seekingCheck) {
        return [
            super.getMoves(game, square, seekingCheck, this.hopForwardLeft.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopForwardRight.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopRightForward.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopRightBackward.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopBackwardLeft.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopBackwardRight.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopLeftForward.bind(this), 1),
            super.getMoves(game, square, seekingCheck, this.hopLeftBackward.bind(this), 1)
        ]
    }
}
