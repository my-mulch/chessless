import ChessPiece from './piece'

export default class Rook extends ChessPiece {
    constructor(team, id) { super(ChessPiece.ROOK, team, id) }

    getMoves(game, square, seekingCheck) {
        return [
            super.getMoves(game, square, seekingCheck, super.moveLeft.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveRight.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveForward.bind(this)),
            super.getMoves(game, square, seekingCheck, super.moveBackward.bind(this)),
        ]
    }
}
