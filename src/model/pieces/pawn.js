import ChessPiece from './piece'

export default class Pawn extends ChessPiece {
    getMoves(board) {
        const moves = []

        // Enpassant
        for (const square of [
            board.getSquare(this.rank, this.file + 1),
            board.getSquare(this.rank, this.file - 1),
        ]) {
            if (square &&
                square.piece &&
                square.piece.team !== this.team &&
                square.piece.constructor === Pawn &&
                square.piece.history.length === 1 
                // && square.piece.history[0] === ChessMove.PAWN_DOUBLE_PUSH
                ) {

                // moves.push(new ChessMove(board.getSquare(square.rank + 1, square.file)))
            }
        }

        // Captures
        for (const square of [
            board.getSquare(this.rank + 1, this.file + 1),
            board.getSquare(this.rank + 1, this.file - 1),
        ]) {
            if (square &&
                square.piece &&
                square.piece.team !== this.team) {

                // moves.push(new ChessMove(square))
            }
        }

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