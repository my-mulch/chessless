
export default class Pawn {
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
            return new ChessMove(from, to)
        }

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
            return new ChessMove(from, to)
        }

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
            ? [new ChessMove(from, ChessBoard.indexOf(this.next(rank, 2), file))]
            : []
    }

    getMoves(game, rank, file) {
        return [
            ...this.pawnCapture(game, rank, file),
            ...this.pawnSinglePush(game, rank, file),
            ...this.pawnDoublePush(game, rank, file),
        ]
    }
}
