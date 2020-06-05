import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Bishop extends ChessPiece {
    bishopMove(game, rank, file) {
        const moves = []
        const square = game.board.getSquare(rank, file)

        let runner = square


        return moves
    }

    getMoves(game, rank, file) {
        return []
    }
}
















// let runner = game.board.getSquare(nextRank(), nextFile())

// let i = 2
// while (runner && !runner.piece) {
//     moves.push(new ChessMove({
//         type: this.bishopMove.name,
//         from: square,
//         to: runner
//     }))

//     runner = game.board.getSquare(nextRank(i), nextFile(i))
// }


// if (runner && runner.piece && runner.piece.team !== this.team)
//     moves.push(new ChessMove({
//         type: this.bishopMove.name,
//         from: square,
//         to: runner,
//         capture: runner.piece
//     }))
