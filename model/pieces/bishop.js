import ChessPiece from './piece'

export default class Bishop extends ChessPiece {
    constructor(team, id) { super(ChessPiece.BISHOP, team, id) }

    getMoves(game, square, seekingCheck) {
        return [
            super.getMoves(game, square, seekingCheck, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveBackwardRight.bind(this))
        ]
    }
}
