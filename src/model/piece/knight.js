import ChessMove from './move'
import ChessPiece from './index'

export default class Knight {
    static knightMove(game, piece, from) {
        const squares = [
            ChessPiece.left(piece, ChessPiece.forward(piece, from, 2)),
            ChessPiece.right(piece, ChessPiece.forward(piece, from, 2)),

            ChessPiece.forward(piece, ChessPiece.right(piece, from, 2)),
            ChessPiece.backward(piece, ChessPiece.right(piece, from, 2)),

            ChessPiece.left(piece, ChessPiece.backward(piece, from, 2)),
            ChessPiece.right(piece, ChessPiece.backward(piece, from, 2)),

            ChessPiece.forward(piece, ChessPiece.left(piece, from, 2)),
            ChessPiece.backward(piece, ChessPiece.left(piece, from, 2)),
        ]

        const knightMoves = (to) => ChessMove.isEmptySquareOrOtherTeam(game.board[to], piece)
        const moves = (to) => ChessMove.create(from, to, Knight.knightMove.name)

        return squares.filter(knightMoves).map(moves)
    }

    static getMoves(game, piece, from) {
        return this.knightMove(game, piece, from)
    }
}
