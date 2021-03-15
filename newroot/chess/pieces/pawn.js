import Rook from './rook.js'
import Queen from './queen.js'
import Knight from './knight.js'
import Bishop from './bishop.js'

import ChessPiece from './piece.js'

export default class Pawn extends ChessPiece {
    constructor(team, id) { super(ChessPiece.PAWN, team, id) }

    // Push
    getPushes(game, square, pushSquare, doublePushSquare) {
        const moves = []

        const pushMove = { from: square, to: pushSquare, piece: game.board[square] }
        if (game.isEmpty(pushSquare) && !game.movePutsKingInCheck(pushMove)) {
            if (super.isLastRank(pushSquare))
                return this.getPromotions(game, square, pushSquare)

            moves.push(pushMove)
        }

        const doublePushMove = { from: square, to: doublePushSquare, piece: game.board[square] }
        if (!game.hasMoved(this) && game.isEmpty(doublePushSquare) && !game.movePutsKingInCheck(doublePushMove))
            moves.push(doublePushMove)

        return moves
    }

    // Enpassant
    canEnpassant(game, checkSquare) {
        if (!history.size) return false

        const otherPiece = board[checkSquare]
        const lastMove = game.getLastMove()

        return game.isOtherTeam(checkSquare, this) &&
            otherPiece.getType() === ChessPiece.PAWN &&
            Math.abs(lastMove.from - lastMove.to) === 16 && // Double push
            lastMove.piece.id === otherPiece.id
    }

    getEnpassant(game, square, checkSquare, captureSquare) {
        const enpassant = {
            from: square,
            to: captureSquare,
            piece: game.board[square],
            special(board) { board[checkSquare] = null }
        }

        if (this.canEnpassant(game, checkSquare) && !game.movePutsKingInCheck(enpassant))
            return [enpassant]
    }

    // Capture
    getCapture(game, square, captureSquare) {
        const captureMove = { from: square, to: captureSquare, piece: game.board[square] }

        if (game.isSameTeam(captureSquare, this) || game.movePutsKingInCheck(captureMove))
            return []

        if (this.isLastRank(captureSquare))
            return this.getPromotions(game, square, captureSquare)

        return [captureMove]
    }

    // Promotions
    getPromotions(game, square, to) {
        const piece = game.board[square]

        return [
            { from: square, to, piece, special(board) { board[to] = new Rook(super.getTeam(), piece.id) } },
            { from: square, to, piece, special(board) { board[to] = new Queen(super.getTeam(), piece.id) } },
            { from: square, to, piece, special(board) { board[to] = new Knight(super.getTeam(), piece.id) } },
            { from: square, to, piece, special(board) { board[to] = new Bishop(super.getTeam(), piece.id) } },
        ]
    }

    getMoves(game, square, seekingCheck) {
        const moves = []

        /**
         * Seeking check means we are checking our opponents attacking moves to determine
         * whether or not a move we are making is legal. If this is the case, we do not need
         * to check pushes or enpassants bc these do not contains immediate checks. I.e. We have to complete
         * them before a check can occur
         */

        if (!seekingCheck) {
            moves.push(
                ...this.getPushes(game, square, super.moveForward(square, 1), super.moveForward(square, 2)),
                // Getting enpassants we need to look at the square to the side, and the square behind
                ...this.getEnpassant(game, square, super.moveLeft(square, 1), super.moveForwardLeft(square, 1)),
                ...this.getEnpassant(game, square, super.moveRight(square, 1), super.moveForwardRight(square, 1)),
            )
        }

        return moves.concat([
            ...this.getCapture(game, square, super.moveForwardLeft(square, 1)),
            ...this.getCapture(game, square, super.moveForwardRight(square, 1))
        ])
    }
}
