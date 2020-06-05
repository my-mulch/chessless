import ChessTeam from './team'
import ChessBoard from '../board'
import ChessPiece from '../pieces/piece'

export default class ChessGame {
    constructor() {
        this.turn = ChessPiece.WHITE
        this.history = []

        this.board = new ChessBoard(
            ...ChessTeam.init(ChessPiece.WHITE),
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            ...ChessTeam.init(ChessPiece.BLACK),
        )
    }

    getMoves() {
        const moves = []

        for (let index = 0; index < this.board.length; index++) {
            const piece = this.board[index]

            if (piece && piece.team === this.turn)
                moves.push(...piece.getMoves(this, index))
        }

        return moves
    }
}

const game = new ChessGame()
const moves = game.getMoves()

console.log(moves)
