import ChessPiece from './piece.js'

export default class Knight extends ChessPiece {
    static attackInRange = () => true
    static attackDirections = new Set([ChessPiece.attacks.KNIGHT])
    constructor(team, id) { super(ChessPiece.KNIGHT, team, id) }

    getMoves(game, from) {
        return ChessPiece.moves.KNIGHT.map(move => (
            super.getMoves({ game, from, next: move.bind(this), steps: 1 })
        ))
    }
}
