import ChessPiece from '../piece.js'

export default class Bishop extends ChessPiece {
    constructor(team) { super(ChessPiece.BISHOP, team) }

    getMoves(game, square) {
        return [
            ...super.getMoves(game, square, super.moveForwardLeft.bind(this)),
            ...super.getMoves(game, square, super.moveForwardRight.bind(this)),
            ...super.getMoves(game, square, super.moveBackwardLeft.bind(this)),
            ...super.getMoves(game, square, super.moveBackwardRight.bind(this))
        ]
    }
}
