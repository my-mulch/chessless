import ChessPiece from './piece.js'
import Knight from './knight.js'

export default class King extends ChessPiece {
    static attackDirections = new Set([
        ChessPiece.ATTACKS_DIAGONALLY,
        ChessPiece.ATTACKS_CARDINALLY
    ])

    static attackInRange = (from, to) => {
        // Don't wrap around the board!
        if (!(to % 8) && to - from === 1) return false
        if (!(from % 8) && from - to === 1) return false

        const distance = Math.abs(from - to)

        return (
            distance === 1 ||
            distance === 7 ||
            distance === 8 ||
            distance === 9
        )
    }

    constructor(team, id) { super(ChessPiece.KING, team, id) }

    getCastle(game, square, moveCastleSide, rookStart) {
        // Which side are we castling on?
        const castleSide = moveCastleSide.name.includes(ChessPiece.KING)
            ? game.turn === ChessPiece.WHITE ? ChessPiece.WHITE_KING : ChessPiece.BLACK_KING
            : game.turn === ChessPiece.WHITE ? ChessPiece.WHITE_QUEEN : ChessPiece.BLACK_QUEEN

        // Check if we have castling rights (FEN concept)
        if (!game.castles.includes(castleSide))
            return null

        // If the king is in check, ya can't castle
        if (this.isInCheck(game, square)) return null

        // Get the rook
        const rook = game.board[rookStart]

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

    isInCheck(game, from) {
        // Checks all possible directions from the King to find check
        return [
            ...ChessPiece.moves.CARDINALS.map(move => (
                super.getMoves({ game, from, next: move.bind(this), check: ChessPiece.ATTACKS_CARDINALLY })
            )),
            ...ChessPiece.moves.DIAGONALS.map(move => (
                super.getMoves({ game, from, next: move.bind(this), check: ChessPiece.ATTACKS_DIAGONALLY })
            )),
            ...ChessPiece.moves.KNIGHT.map(move => (
                super.getMoves({ game, from, next: move.bind(this), check: ChessPiece.ATTACKS_KNIGHTLY, steps: 1 })
            ))
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
        return [
            ChessPiece.moves.CARDINALS.concat(ChessPiece.moves.DIAGONALS).map(move => (
                super.getMoves({ game, from, next: move.bind(this), steps: 1, special: this.revokeCastlingRights })
            )),
            // To castle, we need: (game, from, castleSide, rookPosition)
            this.getCastle(game, from, super.moveKingSide.bind(this), super.moveKingSide(from, 3)),
            this.getCastle(game, from, super.moveQueenSide.bind(this), super.moveQueenSide(from, 4))
        ]
    }
}
