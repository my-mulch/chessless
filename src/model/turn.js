
export default class ChessTurn {
    constructor(team, seekingCheck = false) {
        this.team = team
        this.moves = {}
        this.from = null
        this.piece = null
        this.seekingCheck = seekingCheck
    }

    addMove(move) {
        this.moves[move.to] = this.moves[move.to] || {}
        this.moves[move.to][move.from] = this.moves[move.to][move.from] || []
        this.moves[move.to][move.from].push(move)
    }

    getMove(from, to) {
        try { return this.moves[to][from] }
        catch  { return null }
    }

    clone() {
        return new ChessTurn(this.team, this.seekingCheck)
    }
}
