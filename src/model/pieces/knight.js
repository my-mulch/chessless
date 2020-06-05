import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Knight extends ChessPiece {
    knightMove(game, rank, file) {
        return [
            game.board.getSquare(this.next(rank, 2), this.next(file)),
            game.board.getSquare(this.next(rank, 2), this.prev(file)),

            game.board.getSquare(this.next(rank), this.next(file, 2)),
            game.board.getSquare(this.prev(rank), this.next(file, 2)),

            game.board.getSquare(this.next(rank), this.prev(file, 2)),
            game.board.getSquare(this.prev(rank), this.prev(file, 2)),

            game.board.getSquare(this.prev(rank, 2), this.next(file)),
            game.board.getSquare(this.prev(rank, 2), this.prev(file))
        ].filter(function (square) {
            return square && (!square.piece || square.piece.team !== this.team)
        }, this).map(function (square) {
            return new ChessMove({
                type: this.knightMove.name,
                from: game.board.getSquare(rank, file),
                to: square
            })
        }, this)
    }

    getMoves(game, rank, file) {
        return this.knightMove(game, rank, file)
    }
}
