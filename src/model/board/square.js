
export default class ChessSquare {
    static DARK = 'dark'
    static LIGHT = 'light'
    static COLORS = [ChessSquare.DARK, ChessSquare.LIGHT]

    constructor(rank, file, piece) {
        this.rank = rank
        this.file = file
        this.piece = piece
        this.color = ChessSquare.COLORS[(rank + file) % 2]
    }

    toString() {
        return `${this.color} ${this.piece ? this.piece : ''}`
    }
}
