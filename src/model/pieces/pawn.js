import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Pawn extends ChessPiece {
    enpassant(game) {
        return [
            game.board.getSquare(this.rank, this.prevFile()),
            game.board.getSquare(this.rank, this.nextFile())
        ].filter(function (square) {
            return square && // is in bounds
                square.piece && // has a piece
                square.piece.team !== this.team && // is an opponent
                square.piece.constructor === Pawn && // is a pawn
                game.history.lastMove.piece === square.piece && // was the last piece to move
                game.history.lastMove.type === this.pawnDoublePush.name // last move was a double push

        }).map(function (square) {
            return new ChessMove(
                this.enpassant.name, // Move type
                game.board.getSquare(this.rank, this.file), // from square
                game.board.getSquare(this.nextRank(), square.file), // to square
                square // capture square (only for enpassant)
            )
        })
    }

    pawnCapture() {
        return [
            game.board.getSquare(this.nextRank(), this.nextFile()),
            game.board.getSquare(this.nextRank(), this.prevFile())
        ].filter(function (square) {
            return square &&
                square.piece &&
                square.piece.team !== this.team
        }).map(function (square) {
            return new ChessMove(
                this.pawnCapture.name,
                game.board.getSquare(this.rank, this.file), // from square
                square // to square
            )
        })
    }

    pawnSinglePush() {
        return [
            game.board.getSquare(this.nextRank(), this.file),
        ].filter(function (square) {
            return square && !square.piece
        }).map(function (square) {
            return new ChessMove(
                this.pawnSinglePush.name,
                game.board.getSquare(this.rank, this.file), // from square
                square // to square
            )
        })
    }

    pawnDoublePush() {
        const squares = [
            game.board.getSquare(this.nextRank(1), this.file),
            game.board.getSquare(this.nextRank(2), this.file),
        ].filter(function (square) {
            return square && !square.piece
        })

        if (squares.length === 2)
            return [
                new ChessMove(
                    this.pawnDoublePush.name,
                    game.board.getSquare(this.rank, this.file), // from square
                    squares[1] // second open square
                )
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
