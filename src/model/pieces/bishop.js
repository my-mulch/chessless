import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Bishop extends ChessPiece {
    bishopMove(game, from) {
        let allMoves = []
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        const possibleBishopMove = function (to) {
            const square = game.board[to]

            return square !== undefined &&
                (square === null || square.team !== this.team)
        }.bind(this)

        const moves = function (to) {
            return new ChessMove(this.bishopMove.name, from, to)
        }.bind(this)

        const squareOutOfBounds = function (square) { return square === undefined }

        let i = 1
        while (true) {
            const squares = [
                ChessBoard.indexOf(this.next(rank, i), this.next(file, i)),
                ChessBoard.indexOf(this.next(rank, i), this.prev(file, i)),
                ChessBoard.indexOf(this.prev(rank, i), this.prev(file, i)),
                ChessBoard.indexOf(this.prev(rank, i), this.next(file, i)),
            ]

            if (squares.every(squareOutOfBounds))
                break

            allMoves = allMoves.concat(squares.filter(possibleBishopMove).map(moves))

            i++
        }

        return allMoves
    }

    getMoves(game, from) {
        return this.bishopMove(game, from)
    }
}

