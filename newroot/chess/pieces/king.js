import ChessPiece from '../piece'

export default class King extends ChessPiece {
    getCastle(piece, square, board, side, rookStart) {
        // Get the other team's attacking moves
        const newGame = game.getOtherTeamMoves()

        // If the king is in check or has moved, ya can't castle
        if (Boolean(newGame.turn.moves[game.turn.from]) || game.history.moved.has(this.id))
            return

        // Get the rook
        const rook = game.board[rookStart]
        const rookDestination = side(game.turn.from, 1)

        // If the rook has moved, ya can't castle
        if (!rook || game.history.moved.has(rook.id)) return

        // If the king moves through any attacked squares, ya can't castle
        if (newGame.turn.moves[side(game.turn.from, 1)] ||
            newGame.turn.moves[side(game.turn.from, 2)])
            return

        // If there are pieces in the way, ya can't castle
        let rookPosition = rookStart
        const rookStop = side(rookDestination, -1)
        while ((rookPosition = side(rookPosition, -1)) !== rookStop)
            if (!game.isEmptySquare(rookPosition))
                return

        // Finally, castle
        game.considerMove(side(game.turn.from, 2), game => {
            game.board[rookDestination] = rook
            game.board[rookStart] = null
        })
    }

    getMoves(piece, square, board) {
        // if (!game.turn.seekingCheck) {
        //     this.getCastle(game, this.moveKingSide.bind(this), this.moveKingSide(game.turn.from, 3))
        //     this.getCastle(game, this.moveQueenSide.bind(this), this.moveQueenSide(game.turn.from, 4))
        // }
        return {
            ...this.find(game, this.moveLeft, 1),
            ...this.find(game, this.moveRight, 1),
            ...this.find(game, this.moveForward, 1),
            ...this.find(game, this.moveBackward, 1),
            ...this.find(game, this.moveForwardLeft, 1),
            ...this.find(game, this.moveForwardRight, 1),
            ...this.find(game, this.moveBackwardLeft, 1),
            ...this.find(game, this.moveBackwardRight, 1),
        }
    }
}
