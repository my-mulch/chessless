import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Pawn extends ChessPiece {
    enpassant(game) {
        return [
            game.board.getSquare(this.rank, this.prevFile()),
            game.board.getSquare(this.rank, this.nextFile())
        ].filter(function (square) {
            return square &&
                square.piece &&
                square.piece.team !== this.team &&
                square.piece.constructor === Pawn &&
                game.history.lastMove.piece === square.piece &&
                game.history.lastMove.type === this.pawnDoublePush.name

        }, this).map(function (square) {
            return new ChessMove({
                type: this.enpassant.name,
                from: game.board.getSquare(this.rank, this.file),
                to: game.board.getSquare(this.nextRank(), square.file),
                capture: square.piece
            })
        }, this)
    }

    pawnCapture(game) {
        return [
            game.board.getSquare(this.nextRank(), this.nextFile()),
            game.board.getSquare(this.nextRank(), this.prevFile())
        ].filter(function (square) {
            return square &&
                square.piece &&
                square.piece.team !== this.team
        }, this).map(function (square) {
            return new ChessMove({
                type: this.pawnCapture.name,
                from: game.board.getSquare(this.rank, this.file),
                to: square,
            })
        }, this)
    }

    pawnSinglePush(game) {
        return [
            game.board.getSquare(this.nextRank(), this.file),
        ].filter(function (square) {
            return square && !square.piece
        }).map(function (square) {
            return new ChessMove({
                type: this.pawnSinglePush.name,
                from: game.board.getSquare(this.rank, this.file),
                to: square
            })
        }, this)
    }

    pawnDoublePush(game) {
        const squares = [
            game.board.getSquare(this.nextRank(1), this.file),
            game.board.getSquare(this.nextRank(2), this.file),
        ].filter(function (square) {
            return square && !square.piece
        })

        if (squares.length === 2)
            return [
                new ChessMove({
                    type: this.pawnDoublePush.name,
                    from: game.board.getSquare(this.rank, this.file),
                    to: squares[1]
                })
            ]

        return []
    }

    getMoves(game) {
        return [
            ...this.enpassant(game),
            ...this.pawnCapture(game),
            ...this.pawnSinglePush(game),
            ...this.pawnDoublePush(game),
        ]
    }
}
