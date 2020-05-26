
export default class ChessPiece {
    constructor(file, rank, type, team) {
        this.file = file
        this.rank = rank
        this.type = type
        this.team = team
        this.history = []
        this.alive = true
    }
}
