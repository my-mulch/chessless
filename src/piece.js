
export default class ChessPiece {
    constructor(type, team, file, rank) {
        this.type = type
        this.team = team
        this.file = file
        this.rank = rank
        this.history = []
        this.alive = true
    }

    setLocation(file, rank) {
        this.file = file
        this.rank = rank
    }
}

