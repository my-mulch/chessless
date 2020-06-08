import ChessMove from './move'
import ChessPiece from './index'

export default class Pawn {
    static pawnCapture(game, piece, from) {
        const squares = [
            ChessPiece.forwardLeft(piece, from),
            ChessPiece.forwardRight(piece, from)
        ]

        const captures = (to) => ChessMove.isOtherTeam(piece, game.board[to])
        const moves = (to) => ChessMove.create(from, to, Pawn.pawnCapture.name)

        return squares.filter(captures).map(moves)
    }

    static pawnSinglePush(game, from) {
        const squares = [ChessPiece.forward(piece, from)]

        const squareIsEmpty = (to) => !game.board[to]
        const moves = (to) => ChessMove.create(from, to, Pawn.pawnSinglePush.name)

        return squares.filter(squareIsEmpty).map(moves)
    }

    static pawnDoublePush(game, from) {
        const squares = [
            ChessPiece.forward(piece, from, 1),
            ChessPiece.forward(piece, from, 2)
        ]

        const squareIsEmpty = (to) => !game.board[to]
        const to = ChessPiece.forward(piece, from, 2)

        return squares.every(squareIsEmpty)
            ? [ChessMove.create(from, to, Pawn.pawnDoublePush.name)]
            : []
    }

    static getMoves(game, piece, from) {
        return [
            ...Pawn.pawnCapture(game, piece, from),
            ...Pawn.pawnSinglePush(game, piece, from),
            ...Pawn.pawnDoublePush(game, piece, from),
        ]
    }
}
