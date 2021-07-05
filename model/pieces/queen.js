import ChessPiece from './piece.js'

export default class Queen extends ChessPiece {
    static attackDirections = new Set([ChessPiece.attacks.DIAGONAL, ChessPiece.attacks.CARDINAL])
    constructor(team, id) { super(ChessPiece.QUEEN, team, id) }

    getMoves(game, from) {
        const { CARDINALS, DIAGONALS } = ChessPiece.moves
        return DIAGONALS.concat(CARDINALS).map(move => super.getMoves({ game, from, next: move.bind(this) }))
    }
}
