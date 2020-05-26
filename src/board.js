
export default class ChessBoard extends Array {
    static NUM_SQUARES = 64
    static FILES = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
    static RANKS = { ONE: 0, TWO: 1, THREE: 2, FOUR: 3, FIVE: 4, SIX: 5, SEVEN: 6, EIGHT: 7 }

    static indexOf(file, rank) {
        if (file < 0 || file > 9)
            throw 'You passed an invalid file'

        if (rank < 0 || rank > 9)
            throw 'You passed an invalid rank'

        return rank * 8 + file
    }

    constructor() {
        super(ChessBoard.NUM_SQUARES)
    }

    setSquare(rank, file, piece) {
        const index = ChessBoard.indexOf(rank, file)

        this[index] = piece
    }

    getSquare(rank, file) {
        return this[ChessBoard.indexOf(rank, file)]
    }
}
