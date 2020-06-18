import ChessPiece from './piece'
import { indexOf } from './utils'

export default class ChessBoard extends Uint8Array {
    static SQUARE_COLORS = ['dark', 'light']

    describeSquare(rank, file) {
        const color = ChessBoard.SQUARE_COLORS[(rank + file) % 2]
        const piece = ChessPiece.toString(this.getSquare(rank, file))

        return `${color} ${piece}`
    }

    getSquare(rank, file) {
        return this[indexOf(rank, file)]
    }
}
