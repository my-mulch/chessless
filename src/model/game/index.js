import ChessTeam from './team'
import ChessBoard from '../board'
import ChessPiece from '../pieces/piece'

export default class ChessGame {
    constructor({
        turn = ChessPiece.WHITE,
        board = new ChessBoard(
            ...ChessTeam.init(ChessPiece.WHITE),
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            ...ChessTeam.init(ChessPiece.BLACK))
    }) {
        this.turn = turn
        this.board = board
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

    makeMove(from, to) {
        const game = this.clone()
        const moves = this.getMoves()

        for (const move of moves) {
            if (move.from === from && move.to === to) {
                game.turn = game.turn === ChessPiece.WHITE
                    ? ChessPiece.BLACK
                    : ChessPiece.WHITE

                game.board[to] = game.board[from]
                game.board[from] = null

                break
            }
        }

        return game
    }

    clone() {
        return new ChessGame({
            turn: this.turn.slice(),
            board: this.board.clone()
        })
    }
}


