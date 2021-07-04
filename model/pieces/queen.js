import ChessPiece from './piece.js'

export default class Queen extends ChessPiece {
    static attackInRange = () => true
    static attackDirections = new Set([ChessPiece.ATTACKS_DIAGONALLY, ChessPiece.ATTACKS_CARDINALLY])
    constructor(team, id) { super(ChessPiece.QUEEN, team, id) }

    getMoves(game, from) {
        return ChessPiece.moves.DIAGONALS.concat(ChessPiece.moves.CARDINALS).map(move => (
            super.getMoves({ game, from, next: move.bind(this) })
        ))
    }
}
