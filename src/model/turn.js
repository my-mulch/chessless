
export default class ChessTurn {
    constructor(team) {
        this.team = team
        this.moves = {}
        this.from = null
        this.piece = null
    }

    addMove(move) {
        this.moves[move.to] = this.moves[move.to] || {}
        this.moves[move.to][move.from] = move
    }

    getMove(from, to) {
        try { return this.moves[to][from] }
        catch  { return null }
    }
}
