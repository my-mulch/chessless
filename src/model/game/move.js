
export default class ChessMove {
    constructor(type, from, to, capture = null) {
        this.to = to
        this.from = from
        this.type = type

        // for enpassant wherein capture square is different than piece location
        this.capture = capture

        // for simplicity
        this.piece = from.piece
    }

    make() {

    }
}
