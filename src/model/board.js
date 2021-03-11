import ChessTeam from './team'
import ChessPiece from './piece'
import { indexOf, coinFlip, randInt } from './utils'

export default class ChessBoard extends Array {
    static NUM_SQUARES = 64
    static SQUARE_COLORS = ['dark', 'light']

    static random() {
        const black = ChessTeam.init(ChessPiece.BLACK)
        const white = ChessTeam.init(ChessPiece.WHITE)
        const board = new Array(ChessBoard.NUM_SQUARES)

        for (let i = 0; i < ChessBoard.NUM_SQUARES; i++)
            if (coinFlip()) {
                let team = coinFlip() ? black : white
                board[i] = team.splice(randInt(team.length), 1).pop()
            }
            
        return new ChessBoard(...board)
    }

    describeSquare(rank, file) {
        const color = ChessBoard.SQUARE_COLORS[(rank + file) % 2]
        const piece = this.getSquare(rank, file)

        return `${color} ${(piece && piece.toString()) || ''}`
    }

    getSquare(rank, file) {
        return this[indexOf(rank, file)]
    }
}
