import { indexOf } from './utils'

export default class ChessBoard extends Array {
    static SQUARE_COLORS = ['dark', 'light']

    describeSquare(rank, file) {
        const color = ChessBoard.SQUARE_COLORS[(rank + file) % 2]
        const piece = this.getSquare(rank, file)

        return `${color} ${(piece && piece.toString()) || ''}`
    }

    getSquare(rank, file) {
        return this[indexOf(rank, file)]
    }
}
