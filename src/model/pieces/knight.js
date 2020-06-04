import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Knight extends ChessPiece {
    knightMove(game) {
        return [
            game.board.getSquare(this.nextRank(2), this.nextFile()),
            game.board.getSquare(this.nextRank(2), this.prevFile()),

            game.board.getSquare(this.nextRank(), this.nextFile(2)),
            game.board.getSquare(this.prevRank(), this.nextFile(2)),

            game.board.getSquare(this.nextRank(), this.prevFile(2)),
            game.board.getSquare(this.prevRank(), this.prevFile(2)),

            game.board.getSquare(this.prevRank(2), this.nextFile()),
            game.board.getSquare(this.prevRank(2), this.prevFile()),
        ].filter(function (square) {
            return square && (!square.piece || square.piece.team !== this.team)
        }, this).map(function (square) {
            return new ChessMove({
                type: this.knightMove.name,
                from: game.board.getSquare(this.rank, this.file),
                to: square
            })
        }, this)
    }

    getMoves(game) {
        return this.knightMove(game)
    }
}
