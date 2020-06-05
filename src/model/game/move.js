
export default class ChessMove {
    constructor(type, from, to, capture = null) {
        this.type = type
        this.from = from
        this.to = to
        this.capture = capture
    }
}
