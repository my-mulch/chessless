import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Bishop extends ChessPiece {
    bishopMove(game, nextRank, nextFile) {
        const moves = []
        const square = game.board.getSquare(this.rank, this.file)

        let runner = game.board.getSquare(nextRank(), nextFile())

        let i = 2
        while (runner && !runner.piece) {
            moves.push(new ChessMove({
                type: this.bishopMove.name,
                from: square,
                to: runner
            }))

            runner = game.board.getSquare(nextRank(i), nextFile(i))
        }


        if (runner && runner.piece && runner.piece.team !== this.team)
            moves.push(new ChessMove({
                type: this.bishopMove.name,
                from: square,
                to: runner,
                capture: runner.piece
            }))

        return moves
    }

    getMoves(game) {
        return [
            ...this.bishopMove(game, this.nextRank.bind(this), this.nextFile.bind(this)),
            ...this.bishopMove(game, this.nextRank.bind(this), this.prevFile.bind(this)),
            ...this.bishopMove(game, this.prevRank.bind(this), this.prevFile.bind(this)),
            ...this.bishopMove(game, this.prevRank.bind(this), this.nextFile.bind(this)),
        ]
    }
}
