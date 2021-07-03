import ChessPiece from './piece.js'

export default class Queen extends ChessPiece {
    constructor(team, id) { super(ChessPiece.QUEEN, team, id) }

    getMoves(game, square) {
        return [
            super.getMoves(game, square, super.moveLeft.bind(this)),
            super.getMoves(game, square, super.moveRight.bind(this)),
            super.getMoves(game, square, super.moveForward.bind(this)),
            super.getMoves(game, square, super.moveBackward.bind(this)),
            super.getMoves(game, square, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, super.moveBackwardRight.bind(this)),
        ]
    }
}
