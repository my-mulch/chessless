import ChessPiece from './piece'

export default class Bishop extends ChessPiece {
    constructor(team, id) { super(ChessPiece.BISHOP, team, id) }

    getMoves(game, square, otherTeamSeekingCheck) {
        return [
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveBackwardRight.bind(this))
        ]
    }
}
