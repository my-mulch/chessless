import ChessPiece from './piece.js'

export default class King extends ChessPiece {
    static attackDirections = new Set([
        ChessPiece.attacks.DIAGONAL,
        ChessPiece.attacks.CARDINAL
    ])

    attackInRange(from, to) {
        const distance = Math.abs(from - to)

        return distance === 1 || distance === 7 || distance === 8 || distance === 9
    }

    constructor(team, id) { super(ChessPiece.KING, team, id) }

    getCastle(game, square, moveCastleSide, rookStart) {
        // Which side are we castling on?
        const castleType = moveCastleSide.name.includes(ChessPiece.KING)
            ? game.turn === ChessPiece.WHITE ? ChessPiece.WHITE_KING : ChessPiece.BLACK_KING
            : game.turn === ChessPiece.WHITE ? ChessPiece.WHITE_QUEEN : ChessPiece.BLACK_QUEEN

        // If starting in the middle of the game, ensure that rookStart and square are correct
        if (castleType === ChessPiece.WHITE_KING)
            if (square !== 60 || rookStart !== 63) return null

        if (castleType === ChessPiece.BLACK_KING)
            if (square !== 4 || rookStart !== 7) return null

        if (castleType === ChessPiece.WHITE_QUEEN)
            if (square !== 60 || rookStart !== 56) return null

        if (castleType === ChessPiece.BLACK_QUEEN)
            if (square !== 4 || rookStart !== 0) return null

        // Check if we have castling rights and that the rook is where it should be (FEN concept)
        if (!game.castles.includes(castleType))
            return null

        // If the king is in check, ya can't castle
        if (this.isInCheck(game, square)) return null

        // Get the rook
        const rook = game.board[rookStart]

        // Make sure a rook is a rook
        if (!rook || rook.getTeam() !== this.getTeam() || rook.getType() !== ChessPiece.ROOK)
            return null

        // If the king moves through any attacked squares, ya can't castle
        if (this.isInCheck(game, moveCastleSide(square, 1)) ||
            this.isInCheck(game, moveCastleSide(square, 2)))
            return null

        // If there are pieces in the way, ya can't castle
        let rookPosition = rookStart
        const rookDestination = moveCastleSide(square, 1)
        const rookStop = moveCastleSide(rookDestination, -1)

        while ((rookPosition = moveCastleSide(rookPosition, -1)) !== rookStop)
            if (!game.isEmpty(rookPosition)) return null

        // Finally, castle
        return [{
            from: square,
            to: moveCastleSide(square, 2),
            piece: this,
            special: game => {
                game.board[rookDestination] = rook
                game.board[rookStart] = null
                game.clearEnpassant()
            }
        }]
    }

    considerCheck({ game, from, to, check }) {
        if (game.isOtherTeam(to, this)) {
            return ChessPiece.doesAttack(game.board[to], from, to, check)
        }
    }

    isInCheck(game, from) {
        const args = { game, from, action: this.considerCheck }
        const { CARDINAL, DIAGONAL, KNIGHT } = ChessPiece.attacks
        const { CARDINALS, DIAGONALS, KNIGHT: KNIGHTS } = ChessPiece.moves
        // Checks all possible directions from the King to find check
        return [
            ...CARDINALS.map(move => super.getMoves({ ...args, next: move.bind(this), check: CARDINAL })),
            ...DIAGONALS.map(move => super.getMoves({ ...args, next: move.bind(this), check: DIAGONAL })),
            ...KNIGHTS.map(move => super.getMoves({ ...args, next: move.bind(this), check: KNIGHT, steps: 1 }))
        ].some(Boolean)
    }

    revokeCastlingRights(game) {
        if (game.turn === ChessPiece.BLACK) {
            game.castles.replace(ChessPiece.BLACK_KING, '')
            game.castles.replace(ChessPiece.BLACK_QUEEN, '')
        } else {
            game.castles.replace(ChessPiece.WHITE_KING, '')
            game.castles.replace(ChessPiece.WHITE_QUEEN, '')
        }
    }

    getMoves(game, from) {
        const { CARDINALS, DIAGONALS } = ChessPiece.moves
        const args = { game, from, special: this.revokeCastlingRights, steps: 1 }

        return [
            CARDINALS.concat(DIAGONALS).map(move => super.getMoves({ ...args, next: move.bind(this) })),
            // To castle, we need: (game, from, castleSide, rookPosition)
            this.getCastle(game, from, super.moveKingSide.bind(this), super.moveKingSide(from, 3)),
            this.getCastle(game, from, super.moveQueenSide.bind(this), super.moveQueenSide(from, 4))
        ]
    }
}
