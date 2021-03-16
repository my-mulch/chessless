import Rook from './rook.js'
import Queen from './queen.js'
import Knight from './knight.js'
import Bishop from './bishop.js'

import ChessPiece from './piece.js'

export default class Pawn extends ChessPiece {
    constructor(team, id) { super(ChessPiece.PAWN, team, id) }

    // Push
    getPushes(game, square, pushSquare, doublePushSquare) {
        const result = { moves: [], attacks: new Set(), checks: false }

        const pushMove = { from: square, to: pushSquare, piece: game.board[square] }
        if (game.isEmpty(pushSquare) && !game.movePutsKingInCheck(pushMove)) {
            if (super.isLastRank(pushSquare))
                return this.getPromotions(game, square, pushSquare)

            result.moves.push(pushMove)
        }

        const doublePushMove = { from: square, to: doublePushSquare, piece: game.board[square] }
        if (!game.hasMoved(this) && game.isEmpty(doublePushSquare) && !game.movePutsKingInCheck(doublePushMove))
            result.moves.push(doublePushMove)

        return result
    }

    // Enpassant
    canEnpassant(game, checkSquare) {
        if (!game.previousMoves.length) return false

        const otherPiece = game.board[checkSquare]
        const lastMove = game.getLastMove()

        return game.isOtherTeam(checkSquare, this) &&
            otherPiece.getType() === ChessPiece.PAWN &&
            Math.abs(lastMove.from - lastMove.to) === 16 && // Double push
            lastMove.piece.id === otherPiece.id
    }

    getEnpassant(game, square, checkSquare, captureSquare) {
        const result = { moves: [], attacks: new Set(), checks: false }

        if (game.isOutOfBounds(checkSquare) || game.isOutOfBounds(captureSquare))
            return result

        const enpassant = {
            from: square,
            to: captureSquare,
            piece: game.board[square],
            special(board) { board[checkSquare] = null }
        }

        if (this.canEnpassant(game, checkSquare) && !game.movePutsKingInCheck(enpassant))
            result.moves.push(enpassant)

        return result
    }

    // Capture
    getCapture(game, square, seekingCheck, captureSquare) {
        const result = { moves: [], attacks: new Set(), checks: false }

        if (game.isOutOfBounds(captureSquare))
            return result

        result.attacks.add(captureSquare)

        const captureMove = { from: square, to: captureSquare, piece: game.board[square] }

        if (!game.isOtherTeam(captureSquare, this) || (!seekingCheck && game.movePutsKingInCheck(captureMove)))
            return result

        if (game.board[captureSquare].getType() === ChessPiece.KING)
            result.checks = true

        if (this.isLastRank(captureSquare))
            return this.getPromotions(game, square, captureSquare)

        result.moves.push(captureMove)

        return result
    }

    // Promotions
    getPromotions(game, square, to) {
        const result = { moves: [], attacks: new Set(), checks: false }
        const piece = game.board[square]

        result.moves.push(
            { from: square, to, piece, special: (board) => board[to] = new Rook(super.getTeam(), piece.id) },
            { from: square, to, piece, special: (board) => board[to] = new Queen(super.getTeam(), piece.id) },
            { from: square, to, piece, special: (board) => board[to] = new Knight(super.getTeam(), piece.id) },
            { from: square, to, piece, special: (board) => board[to] = new Bishop(super.getTeam(), piece.id) },
        )

        // Capture & promote
        if (Math.abs(square - to) === 7 || Math.abs(square - to) === 9) {
            result.attacks.add(to)

            if (game.board[to].getType() === ChessPiece.KING)
                result.checks = true
        }

        return result
    }

    getMoves(game, square, seekingCheck) {
        const result = []

        /**
         * Seeking check means we are checking our opponents attacking moves to determine
         * whether or not a move we are making is legal. If this is the case, we do not need
         * to check pushes or enpassants bc these do not contains immediate checks. I.e. We have to complete
         * them before a check can occur
         */

        if (!seekingCheck) {
            result.push(
                this.getPushes(game, square, super.moveForward(square, 1), super.moveForward(square, 2)),
                // Getting enpassants we need to look at the square to the side, and the square behind
                this.getEnpassant(game, square, super.moveLeft(square, 1), super.moveForwardLeft(square, 1)),
                this.getEnpassant(game, square, super.moveRight(square, 1), super.moveForwardRight(square, 1)),
            )
        }

        return result.concat([
            this.getCapture(game, square, seekingCheck, super.moveForwardLeft(square, 1)),
            this.getCapture(game, square, seekingCheck, super.moveForwardRight(square, 1))
        ])
    }
}
