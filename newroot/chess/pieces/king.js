import ChessPiece from '../game/piece.js'
import { getMoves, isEmpty } from '../utils'

export default class King extends ChessPiece {
    constructor(team) { super(ChessPiece.KING, team) }
    
    getCastles(square, game, side, rookStart) {
        // Get the other team's attacking moves
        const { checks, attacks } = getMoves(game, this.getOtherTeam())

        // If the king is in check or has moved, ya can't castle
        if (Object.keys(checks).length || history.has(this.id)) return []

        // Get the rook
        const rook = board[rookStart]
        const rookDestination = side(square, 1)

        // If the rook has moved, ya can't castle
        if (!rook || history.has(rook.id)) return []

        // If the king moves through any attacked squares, ya can't castle
        if (attacks.has(side(square, 1)) || attacks.has(side(square, 2))) return []

        // If there are pieces in the way, ya can't castle
        let rookPosition = rookStart
        const rookStop = side(rookDestination, -1)
        while ((rookPosition = side(rookPosition, -1)) !== rookStop)
            if (!isEmpty(board, rookPosition)) return []

        // Finally, castle
        return [{
            from: square,
            to: side(square, 2),
            special(board) {
                board[rookDestination] = rook
                board[rookStart] = null
            }
        }]
    }

    getMoves(square, board, history) {
        return [
            // To castle, we need: (sqaure, board, history, castleSide, rookPosition)
            ...this.getCastles(square, board, history, super.moveKingSide.bind(this), super.moveKingSide(square, 3)),
            ...this.getCastles(square, board, history, super.moveQueenSide.bind(this), super.moveQueenSide(square, 4)),

            ...super.getMoves(square, board, history, super.moveLeft.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveRight.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveForward.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveBackward.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveForwardLeft.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveForwardRight.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveBackwardLeft.bind(this), 1),
            ...super.getMoves(square, board, history, super.moveBackwardRight.bind(this), 1),
        ]
    }
}
