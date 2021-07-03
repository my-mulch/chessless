import ChessPiece from './piece.js'
import Knight from './knight.js'

export default class King extends ChessPiece {
    constructor(team, id) { super(ChessPiece.KING, team, id) }

    getCastle(game, square, moveCastleSide, rookStart) {
        // If the king has moved, ya can't castle
        if (game.hasMoved(this)) return []

        // If the king is in check, ya can't castle
        if (this.isInCheck(game, square)) return []

        // Get the rook
        const rook = game.board[rookStart]

        // If the rook has moved, ya can't castle
        if (!rook || game.hasMoved(rook)) return []

        // If the king moves through any attacked squares, ya can't castle
        if (this.isInCheck(game, moveCastleSide(square, 1)) ||
            this.isInCheck(game, moveCastleSide(square, 2)))
            return []

        // If there are pieces in the way, ya can't castle
        let rookPosition = rookStart
        const rookDestination = moveCastleSide(square, 1)
        const rookStop = moveCastleSide(rookDestination, -1)

        while ((rookPosition = moveCastleSide(rookPosition, -1)) !== rookStop)
            if (!game.isEmpty(rookPosition)) return []

        // Finally, castle
        return [{
            from: square,
            to: moveCastleSide(square, 2),
            piece: this,
            special(board) {
                board[rookDestination] = rook
                board[rookStart] = null
            }
        }]
    }

    isInCheck(game, square) {
        // Checks all possible directions from the King to find check
        return [
            super.getMoves(game, square, super.moveLeft.bind(this)),
            super.getMoves(game, square, super.moveRight.bind(this)),
            super.getMoves(game, square, super.moveForward.bind(this)),
            super.getMoves(game, square, super.moveBackward.bind(this)),
            super.getMoves(game, square, super.moveForwardLeft.bind(this)),
            super.getMoves(game, square, super.moveForwardRight.bind(this)),
            super.getMoves(game, square, super.moveBackwardLeft.bind(this)),
            super.getMoves(game, square, super.moveBackwardRight.bind(this)),

            super.getMoves(game, square, Knight.prototype.hopForwardLeft.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopForwardRight.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopRightForward.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopRightBackward.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopBackwardLeft.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopBackwardRight.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopLeftForward.bind(this), 1),
            super.getMoves(game, square, Knight.prototype.hopLeftBackward.bind(this), 1),
        ].some(Boolean)
    }

    getMoves(game, square) {
        return [
            super.getMoves(game, square, super.moveLeft.bind(this), 1),
            super.getMoves(game, square, super.moveRight.bind(this), 1),
            super.getMoves(game, square, super.moveForward.bind(this), 1),
            super.getMoves(game, square, super.moveBackward.bind(this), 1),
            super.getMoves(game, square, super.moveForwardLeft.bind(this), 1),
            super.getMoves(game, square, super.moveForwardRight.bind(this), 1),
            super.getMoves(game, square, super.moveBackwardLeft.bind(this), 1),
            super.getMoves(game, square, super.moveBackwardRight.bind(this), 1),

            // To castle, we need: (game, square, castleSide, rookPosition)
            this.getCastle(game, square, super.moveKingSide.bind(this), super.moveKingSide(square, 3)),
            this.getCastle(game, square, super.moveQueenSide.bind(this), super.moveQueenSide(square, 4))
        ]
    }
}
