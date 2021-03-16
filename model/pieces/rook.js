import ChessPiece from './piece'

export default class Rook extends ChessPiece {
    constructor(team, id) { super(ChessPiece.ROOK, team, id) }

    getMoves(game, square, otherTeamSeekingCheck) {
        return [
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveLeft.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveRight.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveForward.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveBackward.bind(this)),
        ]
    }
}
