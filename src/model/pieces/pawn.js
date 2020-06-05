import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Pawn extends ChessPiece {
    enpassant(game, from) {
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        const squares = [
            ChessBoard.indexOf(rank, this.prev(file)),
            ChessBoard.indexOf(rank, this.next(file))
        ]

        const possibleEnpassant = function (to) {
            const square = game.board[to]

            return square !== undefined && // in bounds
                square !== null && // not empty
                square.team !== this.team && // other team
                square.constructor === Pawn && // is pawn
                game.history[game.history.length - 1].move.piece === square && // was the last to move
                game.history[game.history.length - 1].move.type === this.pawnDoublePush.name // was a double pawn push

        }.bind(this)

        const moves = function (to) {
            return new ChessMove(this.enpassant.name, from, to)
        }.bind(this)

        return squares.filter(possibleEnpassant).map(moves)
    }

    pawnCapture(game, from) {
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        const squares = [
            ChessBoard.indexOf(this.next(rank), this.next(file)),
            ChessBoard.indexOf(this.next(rank), this.prev(file))
        ]

        const possiblePawnCapture = function (to) {
            const square = game.board[to]

            return square !== undefined &&
                square !== null &&
                square.team !== this.team

        }.bind(this)

        const moves = function (to) {
            return new ChessMove(this.pawnCapture.name, from, to)
        }.bind(this)

        return squares.filter(possiblePawnCapture).map(moves)
    }

    pawnSinglePush(game, from) {
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        const squares = [
            ChessBoard.indexOf(this.next(rank), file),
        ]

        const possibleSinglePush = function (to) {
            const square = game.board[to]

            return square === null
        }

        const moves = function (to) {
            return new ChessMove(this.pawnSinglePush.name, from, to)
        }.bind(this)

        return squares.filter(possibleSinglePush).map(moves)
    }

    pawnDoublePush(game, from) {
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        const squares = [
            ChessBoard.indexOf(this.next(rank, 1), file),
            ChessBoard.indexOf(this.next(rank, 2), file),
        ]

        const squareIsEmpty = function (to) {
            const square = game.board[to]

            return square === null
        }

        return squares.every(squareIsEmpty)
            ? [new ChessMove(this.pawnDoublePush.name, from, ChessBoard.indexOf(this.next(rank, 2), file))]
            : []
    }

    getMoves(game, rank, file) {
        return [
            ...this.enpassant(game, rank, file),
            ...this.pawnCapture(game, rank, file),
            ...this.pawnSinglePush(game, rank, file),
            ...this.pawnDoublePush(game, rank, file),
        ]
    }
}
