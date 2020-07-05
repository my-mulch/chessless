import Rook from './rook'
import Queen from './queen'
import Bishop from './bishop'
import Knight from './knight'

import ChessPiece from '../piece'

export default class Pawn extends ChessPiece {
    // Push
    getPushes(game) {
        const push = this.moveForward(game.turn.from)

        if (game.isEmptySquare(push)) {
            if (this.isLastRank(push))
                return this.getPromotions(game, push)

            game.considerMove(push)
        }

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

        if (game.isOtherTeamSquare(capture)) {
            if (this.isLastRank(capture))
                return this.getPromotions(game, capture)

            game.considerMove(capture)
        }
    }

    // Promotions
    getPromotions(game, to) {
        game.considerMove(to, game => game.board[to] = new Rook(this.team, this.id))
        game.considerMove(to, game => game.board[to] = new Queen(this.team, this.id))
        game.considerMove(to, game => game.board[to] = new Knight(this.team, this.id))
        game.considerMove(to, game => game.board[to] = new Bishop(this.team, this.id))
    }

    getMoves(game) {
        this.getEnpassant(game, this.moveLeft.bind(this), this.moveForwardLeft.bind(this))
        this.getEnpassant(game, this.moveRight.bind(this), this.moveForwardRight.bind(this))

        this.getCapture(game, this.moveForwardLeft.bind(this))
        this.getCapture(game, this.moveForwardRight.bind(this))

        this.getPushes(game)
    }
}
