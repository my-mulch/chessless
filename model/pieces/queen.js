import ChessPiece from './piece.js'

export default class Queen extends ChessPiece {
    constructor(team, id) { super(ChessPiece.QUEEN, team, id) }

    getMoves(game, square, otherTeamSeekingCheck) {
        return [
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveLeft.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveRight.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveForward.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveBackward.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, otherTeamSeekingCheck, super.moveBackwardRight.bind(this)),
        ]
    }
}
