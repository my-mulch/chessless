
export default class ChessMove {
    constructor({ type, from, to, capture = null }) {
        this.to = to
        this.from = from
        this.type = type

        this.piece = this.from.piece
        this.capture = this.to.piece || capture
    }

    make() {

    }
}
