import Rook from './rook.js'
import Queen from './queen.js'
import Knight from './knight.js'
import Bishop from './bishop.js'

import ChessPiece from '../piece.js'
import { isEmpty } from '../utils.js'

export default class Pawn extends ChessPiece {
    constructor(team) { super(ChessPiece.PAWN, team) }

    // Push
    getPushes(square, board, history) {
        const moves = []

        const pushSquare = super.moveForward(square)
        const pushMove = { from: square, to: pushSquare, team: super.getTeam() }

        if (isEmpty(board, pushSquare) && !putsKingInCheck(board, pushMove)) {
            if (super.isLastRank(pushSquare))
                return this.getPromotions(square, pushSquare)

            moves.push(pushMove)
        }

        const doublePushSquare = super.moveForward(pushSquare)
        const doublePushMove = { from: square, to: doublePushSquare, team: super.getTeam() }

        if (!history.has(super.id) &&
            isEmpty(board, doublePushSquare) &&
            !putsKingInCheck(board, doublePushMove))
            moves.push(doublePushMove)
    }

    // Enpassant
    canEnpassant(square, board, history, checkSquare) {
        if (!history.size) return false

        const check = checkSquare(square)
        const otherPiece = board[check]
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
    getPromotions(square, to) {
        return [
            { from: square, to, special(board) { board[to] = new Rook(super.getTeam()) } },
            { from: square, to, special(board) { board[to] = new Queen(super.getTeam()) } },
            { from: square, to, special(board) { board[to] = new Knight(super.getTeam()) } },
            { from: square, to, special(board) { board[to] = new Bishop(super.getTeam()) } }
        ]
    }

    getMoves(game) {
        if (!game.turn.seekingCheck) {
            this.getPushes(game)
            this.getEnpassant(game, this.moveLeft.bind(this), this.moveForwardLeft.bind(this))
            this.getEnpassant(game, this.moveRight.bind(this), this.moveForwardRight.bind(this))
        }

        this.getCapture(game, this.moveForwardLeft.bind(this))
        this.getCapture(game, this.moveForwardRight.bind(this))
    }
}
