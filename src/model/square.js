
export default class ChessBoardSquare {
    static DARK = 'dark'
    static LIGHT = 'light'

    constructor(color) {
        this.color = color
        this.piece = null
    }

    toString() {
        return `${this.color}${this.piece ? this.piece.toString() : ''}`
    }
}
