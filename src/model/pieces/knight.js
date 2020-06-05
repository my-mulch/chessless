import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Knight extends ChessPiece {
    knightMove(game, from) {
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        const squares = [
            ChessBoard.indexOf(this.next(rank, 2), this.next(file)),
            ChessBoard.indexOf(this.next(rank, 2), this.prev(file)),

            ChessBoard.indexOf(this.next(rank), this.next(file, 2)),
            ChessBoard.indexOf(this.prev(rank), this.next(file, 2)),

            ChessBoard.indexOf(this.next(rank), this.prev(file, 2)),
            ChessBoard.indexOf(this.prev(rank), this.prev(file, 2)),

            ChessBoard.indexOf(this.prev(rank, 2), this.next(file)),
            ChessBoard.indexOf(this.prev(rank, 2), this.prev(file))
        ]

        const possibleKnightMove = function (to) {
            const square = game.board[to]

            return square !== undefined && (square === null || square.team !== this.team)
        }.bind(this)

        const moves = function (to) {
            return new ChessMove(this.knightMove.name, from, to)
        }.bind(this)

        return squares.filter(possibleKnightMove).map(moves)
    }

    getMoves(game, from) {
        return this.knightMove(game, from)
    }
}
