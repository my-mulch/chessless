import Rook from './rook.js'
import Queen from './queen.js'
import Knight from './knight.js'
import Bishop from './bishop.js'

import ChessPiece from './piece.js'

export default class Pawn extends ChessPiece {
    static attackDirections = new Set([ChessPiece.ATTACKS_DIAGONALLY])

    static attackInRange = (from, to) => {
        const distance = Math.abs(from - to)
        return distance === 7 || distance === 9
    }

    constructor(team, id) { super(ChessPiece.PAWN, team, id) }

    // Push
    getPushes(game, square, pushSquare, doublePushSquare) {
        const moves = []

        if (!game.isEmpty(pushSquare)) return null

        const pushMove = { from: square, to: pushSquare, piece: this }

        if (game.movePutsKingInCheck(pushMove))
            return null

        if (super.isLastRank(pushSquare))
            return this.getPromotions(square, pushSquare)

        moves.push(pushMove)

        const doublePushMove = {
            from: square,
            to: doublePushSquare,
            piece: this,
            special: game => game.enpassant = pushSquare
        }

        if (!game.hasMoved(this) &&
            game.isEmpty(doublePushSquare) &&
            !game.movePutsKingInCheck(doublePushMove))
            moves.push(doublePushMove)

        return moves
    }

    // Enpassant
    getEnpassant(game, square, checkSquare, captureSquare) {
        if (captureSquare !== game.enpassant)
            return null


        const enpassant = {
            from: square,
            to: captureSquare,
            piece: this,
            special: game => {
                game.board[checkSquare] = null
                game.clearEnpassant()
            }
        }

        if (game.movePutsKingInCheck(enpassant))
            return null

        return enpassant
    }

    // Capture
    getCapture(game, square, captureSquare) {
        if (game.isOutOfBounds(captureSquare) || !game.isOtherTeam(captureSquare, this))
            return null

        const captureMove = { from: square, to: captureSquare, piece: this }

        if (game.movePutsKingInCheck(captureMove))
            return null

        if (super.isLastRank(captureSquare))
            return this.getPromotions(square, captureSquare)

        return captureMove
    }

    promote(game, to, Piece) {
        game.board[to] = new Piece(super.getTeam(), this.id);
        game.clearEnpassant()
    }

    // Promotions
    getPromotions(from, to) {
        return [
            { from, to, piece: this, special: game => this.promote(game, to, Rook) },
            { from, to, piece: this, special: game => this.promote(game, to, Queen) },
            { from, to, piece: this, special: game => this.promote(game, to, Knight) },
            { from, to, piece: this, special: game => this.promote(game, to, Bishop) },
        ]
    }

    getMoves(game, square) {
        return [
            // Getting pushes we look one and two squares forward
            this.getPushes(game, square, super.moveForward(square, 1), super.moveForward(square, 2)),

            // Getting enpassants we need to look at the square to the side, and the square behind it
            this.getEnpassant(game, square, super.moveLeft(square, 1), super.moveForwardLeft(square, 1)),
            this.getEnpassant(game, square, super.moveRight(square, 1), super.moveForwardRight(square, 1)),

            // Getting captures we look diagonally forward one square
            this.getCapture(game, square, super.moveForwardLeft(square, 1)),
            this.getCapture(game, square, super.moveForwardRight(square, 1)),
        ]
    }
}
