import ChessPiece from './piece.js'

export default class Rook extends ChessPiece {
    static attackDirections = new Set([ChessPiece.attacks.CARDINAL])
    constructor(team, id) { super(ChessPiece.ROOK, team, id) }

    revokeCastlingRights(game, square) {
        if (!game.castles) return

        if (game.turn === ChessPiece.WHITE)
            if (ChessPiece.isKingSide(square))
                game.castles.replace(ChessPiece.WHITE_KING, '')
            else
                game.castles.replace(ChessPiece.WHITE_QUEEN, '')
        else
            if (ChessPiece.isKingSide(square))
                game.castles.replace(ChessPiece.BLACK_KING, '')
            else
                game.castles.replace(ChessPiece.BLACK_QUEEN, '')
    }

    getMoves(game, from) {
        return ChessPiece.moves.CARDINALS.map(move => (
            super.getMoves({
                game,
                from,
                next: move.bind(this),
                special: game => this.revokeCastlingRights(game, from)
            })
        ))
    }
}
