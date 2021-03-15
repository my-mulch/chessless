import ChessPiece from './piece'

export default class Rook extends ChessPiece {
    constructor(team, id) { super(ChessPiece.ROOK, team, id) }

    getMoves(game, square) {
        return [
            ...super.getMoves(game, square, super.moveLeft.bind(this)).moves,
            ...super.getMoves(game, square, super.moveRight.bind(this)).moves,
            ...super.getMoves(game, square, super.moveForward.bind(this)).moves,
            ...super.getMoves(game, square, super.moveBackward.bind(this)).moves,
        ]
    }
}
