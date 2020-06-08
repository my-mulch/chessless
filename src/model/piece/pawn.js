import ChessMove from './move'
import ChessPiece from './index'

export default class Pawn {
    pawnCapture(game, piece, from) {
        const squares = [
            ChessPiece.FORWARD_LEFT(piece, from),
            ChessPiece.FORWARD_RIGHT(piece, from)
        ]

        const possiblePawnCapture = (to) => ChessMove.isOtherTeam(piece, game.board[to])
        const moves = (to) => ChessMove.create(from, to, this.pawnCapture.name)

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
