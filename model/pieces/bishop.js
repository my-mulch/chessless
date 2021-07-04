import ChessPiece from './piece.js'

export default class Bishop extends ChessPiece {
    static attackInRange = () => true
    static attackDirections = new Set([ChessPiece.ATTACKS_DIAGONALLY])
    constructor(team, id) { super(ChessPiece.BISHOP, team, id) }

    getMoves(game, from) {
        return ChessPiece.moves.DIAGONALS.map(move => (
            super.getMoves({ game, from, next: move.bind(this) })
        ))
    }
}
