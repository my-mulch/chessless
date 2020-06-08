import ChessPiece from './piece/'

export default class ChessBoard extends Uint8Array {
    static NUM_RANKS = 8
    static SQUARE_COLORS = ['dark', 'light']

    static indexOf(rank, file) {
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

    describeSquare(rank, file) {
        const color = ChessBoard.SQUARE_COLORS[(rank + file) % 2]
        const piece = ChessPiece.toString(this.getSquare(rank, file))

        return `${color} ${piece}`
    }

    getSquare(rank, file) {
        return this[ChessBoard.indexOf(rank, file)]
    }
}
