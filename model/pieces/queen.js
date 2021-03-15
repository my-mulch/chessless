import ChessPiece from './piece'

export default class Queen extends ChessPiece {
    constructor(team, id) { super(ChessPiece.QUEEN, team, id) }

    getMoves(game, square) {
        return [
            ...super.getMoves(game, square, super.moveLeft.bind(this)).moves,
            ...super.getMoves(game, square, super.moveRight.bind(this)).moves,
            ...super.getMoves(game, square, super.moveForward.bind(this)).moves,
            ...super.getMoves(game, square, super.moveBackward.bind(this)).moves,
            ...super.getMoves(game, square, super.moveForwardLeft.bind(this)).moves,
            ...super.getMoves(game, square, super.moveForwardRight.bind(this)).moves,
            ...super.getMoves(game, square, super.moveBackwardLeft.bind(this)).moves,
            ...super.getMoves(game, square, super.moveBackwardRight.bind(this)).moves,
        ]
    }
}