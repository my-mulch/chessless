
export default class ChessMove {
    constructor(start, end, capture) {
        this.end = end
        this.start = start
        this.capture = capture

        this.piece = start.piece
        this.type = null
    }
}
