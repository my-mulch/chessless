
export default class ChessPiece {
    static TEAM_NAMES = ['white', 'black']

    constructor(team) {
        this.team = team
        this.rank = null
        this.file = null
        this.alive = true
        this.history = []
    }

    toString() {
        const team = ChessPiece.TEAM_NAMES[+this.team]
        const type = this.constructor.name.toLowerCase()

        return `${team}-${type}`
    }
}

