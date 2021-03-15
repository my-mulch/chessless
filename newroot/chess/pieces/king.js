import ChessPiece from './piece'

export default class King extends ChessPiece {
    constructor(team, id) { super(ChessPiece.KING, team, id) }

    getCastle(game, square, moveCastleSide, rookStart) {
        // Get the king
        const king = game.board[square]

        // If the king has moved, ya can't castle
        if (game.hasMoved(king)) return []

        // Get the rook
        const rook = game.board[rookStart]

        // If the rook has moved, ya can't castle
        if (!rook || game.hasMoved(rook)) return []

        // Get the other team's attacking moves
        const { checks, attacks } = game.getMoves(this.getOtherTeam(), true)

        // If the king is in check, ya can't castle
        if (checks) return []

        // If the king moves through any attacked squares, ya can't castle
        if (attacks.has(moveCastleSide(square, 1)) || attacks.has(moveCastleSide(square, 2))) return []

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
            special(board) {
                board[rookDestination] = rook
                board[rookStart] = null
            }
        }]
    }

    getMoves(game, square, seekingCheck) {
        const moves = []

        /**
         * Seeking check means we are checking our opponents attacking moves to determine
         * whether or not a move we are making is legal. If this is the case, we do not need
         * to check castling moves
         */

        if (!seekingCheck) {
            moves.push(
                // To castle, we need: (game, square, castleSide, rookPosition)
                ...this.getCastle(game, square, super.moveKingSide.bind(this), super.moveKingSide(square, 3)),
                ...this.getCastle(game, square, super.moveQueenSide.bind(this), super.moveQueenSide(square, 4))
            )
        }

        return moves.concat([
            ...super.getMoves(game, square, super.moveLeft.bind(this), 1),
            ...super.getMoves(game, square, super.moveRight.bind(this), 1),
            ...super.getMoves(game, square, super.moveForward.bind(this), 1),
            ...super.getMoves(game, square, super.moveBackward.bind(this), 1),
            ...super.getMoves(game, square, super.moveForwardLeft.bind(this), 1),
            ...super.getMoves(game, square, super.moveForwardRight.bind(this), 1),
            ...super.getMoves(game, square, super.moveBackwardLeft.bind(this), 1),
            ...super.getMoves(game, square, super.moveBackwardRight.bind(this), 1),
        ])
    }
}
