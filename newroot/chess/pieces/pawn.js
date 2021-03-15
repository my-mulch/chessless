import Rook from './rook.js'
import Queen from './queen.js'
import Knight from './knight.js'
import Bishop from './bishop.js'

import ChessPiece from '../piece.js'
import { isEmpty } from '../utils.js'

export default class Pawn extends ChessPiece {
    constructor(team) { super(ChessPiece.PAWN, team) }

    // Push
    getPushes(game, square, pushSquare, doublePushSquare) {
        const moves = []

        const pushMove = { from: square, to: pushSquare }
        if (isEmpty(board, pushSquare) && !putsOwnKingInCheck(board, pushMove, super.getOtherTeam())) {
            if (super.isLastRank(pushSquare))
                return this.getPromotions(square, pushSquare)

            moves.push(pushMove)
        }

        const doublePushMove = { from: square, to: doublePushSquare }
        if (!game.previouslyMovedPieces.has(super.id) &&
            isEmpty(game.board, doublePushSquare) &&
            !putsOwnKingInCheck(game.board, doublePushMove, super.getOtherTeam())) {
            moves.push(doublePushMove)
        }
    }

    // Enpassant
    canEnpassant(game, checkSquare) {
        if (!history.size) return false

        const otherPiece = board[checkSquare]
        const lastMove = game.getLastMove()

        return super.isOtherTeam(game.board, checkSquare) &&
            otherPiece.getType() === Pawn &&
            Math.abs(lastMove.from - lastMove.to) === 16 && // Double push
            game.board[lastMove.to].id === otherPiece.id
    }

    getEnpassant(game, square, checkSquare, captureSquare) {
        const enpassant = { from: square, to: captureSquare, special(board) { board[checkSquare] = null } }

        if (this.canEnpassant(game, checkSquare) && !putsOwnKingInCheck(game.board, enpassant, super.getOtherTeam()))
            return [enpassant]
    }

    // Capture
    getCapture(game, square, captureSquare) {
        const captureMove = { from: square, to: captureSquare }

        if (super.isOtherTeam(game.board, captureSquare) || putsOwnKingInCheck(game.board, captureMove, super.getOtherTeam()))
            return []

        if (this.isLastRank(captureSquare))
            return this.getPromotions(square, captureSquare)

        return [captureMove]
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

    getMoves(game, square, seekingCheck) {
        const moves = []

        if (seekingCheck) {
            moves.push(...this.getPushes(game, square, super.moveForward(square, 1), super.moveForward(square, 2)))

            // Getting enpassants we need to look at the square to the side, and the square behind
            moves.push(...this.getEnpassant(game, square, super.moveLeft(square, 1), super.moveForwardLeft(square, 1)))
            moves.push(...this.getEnpassant(game, square, super.moveRight(square, 1), super.moveForwardRight(square, 1)))
        }

        moves.push(...this.getCapture(game, square, super.moveForwardLeft(square, 1)))
        moves.push(...this.getCapture(game, square, super.moveForwardRight(square, 1)))

        return moves
    }
}
