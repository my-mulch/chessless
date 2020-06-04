
export default class ChessPiece {
    static FORWARD = 1
    static BACKWARD = -1
    static BLACK = 'black'
    static WHITE = 'white'

    constructor(team) {
        this.team = team
        this.rank = null
        this.file = null
        this.alive = true
        this.history = []
    }

    orient(offset) {
        return this.team === ChessPiece.WHITE
            ? offset * ChessPiece.FORWARD
            : offset * ChessPiece.BACKWARD
    }

    nextRank(offset = 1) {
        offset = this.orient(offset)

        return this.rank + offset
    }

    nextFile(offset = 1) {
        offset = this.orient(offset)

        return this.file + offset
    }
    
    prevRank(offset = 1) { return this.nextRank(offset * -1) }
    prevFile(offset = 1) { return this.nextFile(offset * -1) }

    toString() {
        return `${this.team}-${this.constructor.name.toLowerCase()}`
    }
}

