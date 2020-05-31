
export default class ChessBoardSquare {
    static DARK = 'dark'
    static LIGHT = 'light'
    static COLORS = [ChessBoardSquare.DARK, ChessBoardSquare.LIGHT]

    constructor(color, piece) {
        this.color = ChessBoardSquare.COLORS[color]
        this.piece = piece
    }

    toString() {
        return `${this.color} ${this.piece ? this.piece.toString() : ''}`
    }
}
