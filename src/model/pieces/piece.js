
export default class ChessPiece {
    static FORWARD = 1
    static BACKWARD = -1
    static BLACK = 'black'
    static WHITE = 'white'

    constructor({ team = null, alive = true }) {
        this.team = team
        this.alive = alive

        this.next = this.next.bind(this)
        this.prev = this.prev.bind(this)
    }

    clone() {
        return new this.constructor({
            team: this.team.slice(), 
            alive: this.alive
        })
    }

    orient(offset) {
        return this.team === ChessPiece.WHITE
            ? offset * ChessPiece.FORWARD
            : offset * ChessPiece.BACKWARD
    }

    next(dir, offset = 1) {
        return dir + this.orient(offset)
    }

    prev(dir, offset = 1) {
        return this.next(dir, offset * ChessPiece.BACKWARD)
    }

    toString() {
        return `${this.team}-${this.constructor.name.toLowerCase()}`
    }
}

