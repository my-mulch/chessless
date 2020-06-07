
export default class ChessBoard extends Array {
    static NUM_RANKS = 8
    static RANK_TO_INDEX = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7 }
    static FILE_TO_INDEX = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 }

    static indexOf(rank, file) {
        if (isNaN(rank) || isNaN(file)) {
            rank = ChessBoard.RANK_TO_INDEX[rank]
            file = ChessBoard.FILE_TO_INDEX[file]
        }

        if (rank === undefined || file === undefined)
            return undefined

        if (rank < 0 || rank > 7 || file < 0 || file > 7)
            return undefined

        return rank * ChessBoard.NUM_RANKS + file
    }

    static rankAndFileOf(index) {
        return [
            Math.floor(index / ChessBoard.NUM_RANKS),
            index % ChessBoard.NUM_RANKS
        ]
    }

    getSquare(rank, file) {
        return this[ChessBoard.indexOf(rank, file)]
    }

    clone() {
        return this.map(function (square) {
            return square && square.clone()
        })
    }
}
