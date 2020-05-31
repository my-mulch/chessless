import ChessBoardSquare from './square.js'

export default class ChessBoard extends Array {
    static NUM_RANKS = 8
    static NUM_SQUARES = 64

    static RANK_TO_INDEX = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7 }
    static FILE_TO_INDEX = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 }

    static indexOf(rank, file) {
        if (isNaN(rank) || isNaN(file)) {
            rank = ChessBoard.RANK_TO_INDEX[rank]
            file = ChessBoard.FILE_TO_INDEX[file]
        }

        return rank * ChessBoard.NUM_RANKS + file
    }

    constructor(board) {
        super(ChessBoard.NUM_SQUARES)

        this.ranks = [1, 2, 3, 4, 5, 6, 7, 8].reverse()
        this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        for (let rank = 0; rank < this.ranks.length; rank++) {
            for (let file = 0; file < this.files.length; file++) {
                const index = ChessBoard.indexOf(rank, file)
                const color = (rank + file) % 2
                const piece = board[index]

                if (piece)
                    piece.location = index

                this[index] = new ChessBoardSquare(color, piece)
            }
        }

    }

    getSquare(rank, file) {
        rank = ChessBoard.RANK_TO_INDEX[rank]
        file = ChessBoard.FILE_TO_INDEX[file]

        const index = ChessBoard.indexOf(rank, file)

        return this[index]
    }
}
