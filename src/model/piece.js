
export default class ChessPiece {
    static TEAM_NAMES = ['WHITE', 'BLACK']
    static PIECE_NAMES = ['ROOK', 'KNIGHT', 'BISHOP', 'QUEEN', 'KING', 'PAWN']
    static PIECE_TYPES = { RK: 0, KN: 1, BI: 2, QN: 3, KG: 4, PN: 5 }

    constructor(team, type, location) {
        this.type = type
        this.team = team
        this.location = location
        this.alive = true
    }

    toString() {
        const team = ChessPiece.TEAM_NAMES[Number(this.team)]
        const type = ChessPiece.PIECE_NAMES[this.type]
        
        return `${team}-${type}`
    }
}

