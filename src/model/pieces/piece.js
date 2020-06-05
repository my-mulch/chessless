
export default class ChessPiece {
    static BLACK = 'black'
    static WHITE = 'white'

    constructor(team) {
        this.team = team
        this.alive = true
    }

    toString() {
        return `${this.team}-${this.constructor.name.toLowerCase()}`
    }
}

