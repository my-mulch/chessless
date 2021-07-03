import ChessPiece from './piece.js'

export default class Rook extends ChessPiece {
    static attackInRange = () => true
    static attackDirections = new Set([ChessPiece.ATTACKS_CARDINALLY])
    constructor(team, id) { super(ChessPiece.ROOK, team, id) }

    getMoves(game, square) {
        return [
            super.getMoves(game, square, super.moveLeft.bind(this)),
            super.getMoves(game, square, super.moveRight.bind(this)),
            super.getMoves(game, square, super.moveForward.bind(this)),
            super.getMoves(game, square, super.moveBackward.bind(this)),
        ]
    }
}
