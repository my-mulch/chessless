import ChessPiece from '../piece'

export default class Pawn extends ChessPiece {
    // Push
    getPushes(game) {
        const push = this.moveForward(game.turn.from)

        if (game.isEmptySquare(push))
            game.considerMove(push)

        const doublePush = this.moveForward(push)

        if (game.isEmptySquare(doublePush) && !game.history.moved.has(this.id))
            game.considerMove(doublePush)
    }

    // Enpassant
    canEnpassant(game, checkSquare) {
        if (!game.history.moves.length)
            return false

        const check = checkSquare(game.turn.from)
        const otherPiece = game.board[check]
        const lastMove = game.history.lastMove()

        return game.isOtherTeamSquare(check) &&
            otherPiece.constructor === Pawn &&
            Math.abs(lastMove.from - lastMove.to) === 16 && // Double push
            game.board[lastMove.to] === otherPiece
    }

    getEnpassant(game, checkSquare, captureSquare) {
        const check = checkSquare(game.turn.from)
        const capture = captureSquare(game.turn.from)
        
        if (this.canEnpassant(game, checkSquare))
            game.considerMove(capture, game => game.board[check] = null)
    }

    // Capture
    getCapture(game, captureSquare) {
        const capture = captureSquare(game.turn.from)

        if (game.isOtherTeamSquare(capture))
            game.considerMove(capture)
    }

    getMoves(game) {
        this.getEnpassant(game, this.moveLeft.bind(this), this.moveForwardLeft.bind(this))
        this.getEnpassant(game, this.moveRight.bind(this), this.moveForwardRight.bind(this))

        this.getCapture(game, this.moveForwardLeft.bind(this))
        this.getCapture(game, this.moveForwardRight.bind(this))

        this.getPushes(game)
    }
}
