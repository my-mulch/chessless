
export default class ChessBoardSquare {
    static COLORS = ['dark', 'light']
    static DARK = 'dark'
    static LIGHT = 'light'

    constructor(color) {
        this.color = ChessBoardSquare.COLORS[color]
        this.piece = null
    }

    toString() {
        return `${this.color} ${this.piece ? this.piece.toString() : ''}`
    }
}
