import ChessBoardSquare from './square.js'

export default class ChessBoard extends Array {
    static NUM_RANKS = 8
    static NUM_SQUARES = 64
    static INDICES = [0, 1, 2, 3, 4, 5, 6, 7] // Ranks and Files

    static indexOf(file, rank) {
        return rank * ChessBoard.NUM_RANKS + file
    }

    constructor() {
        super(ChessBoard.NUM_SQUARES)

        for (const rank of ChessBoard.INDICES)
            for (const file of ChessBoard.INDICES)
                this[ChessBoard.indexOf(rank, file)] = new ChessBoardSquare((rank + file) % 2)
    }

    getSquare(rank, file) {
        const index = ChessBoard.indexOf(rank, file)

        return this[index]
    }
}
