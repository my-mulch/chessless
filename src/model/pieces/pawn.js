import ChessPiece from './piece'
import ChessMove from '../game/move'

export default class Pawn extends ChessPiece {
    getMoves(game) {
        const moves = []

        // Enpassant
        for (const square of [
            game.board.getSquare(this.rank, this.file - 1),
            game.board.getSquare(this.rank, this.file + 1),
        ]) {
            if (square && // is in bounds
                square.piece && // has a piece
                square.piece.team !== this.team && // is an opponent
                square.piece.constructor === Pawn && // is a pawn
                game.history.lastMove.piece === square.piece && // was the last piece to move
                game.history.lastMove.type === ChessMove.PAWN_DOUBLE_PUSH) // last move was a double push
                
                moves.push(new ChessMove(this, square))
        }

        // Captures
        // for (const square of [
        //     game.board.getSquare(this.rank + 1, this.file + 1),
        //     board.getSquare(this.rank + 1, this.file - 1),
        // ]) {
        //     if (square &&
        //         square.piece &&
        //         square.piece.team !== this.team) {

        //         // moves.push(new ChessMove(square))
        //     }
        // }

        // Pushing
        // const square = board.getSquare(this.rank + 1, this.file)

        // if (square && !square.piece) {
        //     moves.push(square)

        //     const nextSquare = board.getSquare(this.rank + 2, this.file)

        //     if (nextSquare && !nextSquare.piece)
        //         moves.push(nextSquare)
        // }

        return moves
    }
}