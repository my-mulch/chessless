import ChessSquare from './square'

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

    static rankAndFileOf(index) {
        return [
            Math.floor(index / ChessBoard.NUM_RANKS),
            index % ChessBoard.NUM_RANKS
        ]
    }

    constructor(board) {
        super(ChessBoard.NUM_SQUARES)

        this.ranks = [8, 7, 6, 5, 4, 3, 2, 1]
        this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

        for (let i = 0; i < board.length; i++) {
            const piece = board[i]
            const [rank, file] = ChessBoard.rankAndFileOf(i)

            if (piece) {
                piece.rank = rank
                piece.file = file
            }

            this[i] = new ChessSquare(rank, file, piece)
        }
    }

    getSquare(rank, file) {
        return this[ChessBoard.indexOf(rank, file)]
    }
}
