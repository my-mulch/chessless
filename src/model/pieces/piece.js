
export default class ChessPiece {
    constructor(team) {
        this.team = team
        this.rank = null
        this.file = null
        this.alive = true
        this.history = []
    }

    toString() {
        return `${this.team}-${this.constructor.name.toLowerCase()}`
    }
}

