import ChessBoardSquare from './square.js'

export default class ChessBoard extends Array {
    static NUM_RANKS = 8
    static NUM_SQUARES = 64
    static RANKS = [0, 1, 2, 3, 4, 5, 6, 7] // Ranks and Files
    static FILES = [0, 1, 2, 3, 4, 5, 6, 7] // Ranks and Files

    static indexOf(file, rank) {
        return rank * ChessBoard.NUM_RANKS + file
    }

    constructor() {
        super(ChessBoard.NUM_SQUARES)

        for (const rank of ChessBoard.RANKS)
            for (const file of ChessBoard.FILES)
                this[ChessBoard.indexOf(file, rank)] =
                    new ChessBoardSquare((file + rank) % 2)
    }

    getSquare(file, rank) {
        const index = ChessBoard.indexOf(file, rank)

        return this[index]
    }
}
