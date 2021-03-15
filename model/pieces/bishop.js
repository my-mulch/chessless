import ChessPiece from './piece'

export default class Bishop extends ChessPiece {
    constructor(team, id) { super(ChessPiece.BISHOP, team, id) }

    getMoves(game, square) {
        return [
            ...super.getMoves(game, square, super.moveForwardLeft.bind(this)).moves,
            ...super.getMoves(game, square, super.moveForwardRight.bind(this)).moves,
            ...super.getMoves(game, square, super.moveBackwardLeft.bind(this)).moves,
            ...super.getMoves(game, square, super.moveBackwardRight.bind(this)).moves
        ]
    }
}
