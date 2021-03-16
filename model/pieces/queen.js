import ChessPiece from './piece'

export default class Queen extends ChessPiece {
    constructor(team, id) { super(ChessPiece.QUEEN, team, id) }

    getMoves(game, square, seekingCheck) {
        return [
            super.getMoves(game, square, seekingCheck, super.moveLeft.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveRight.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveForward.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveBackward.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveBackwardRight.bind(this)),
        ]
    }
}
