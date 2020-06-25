import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Pawn {
    static doublePush(piece, from) {
        return ChessPiece.forward(piece, from, 2)
    }

    static isEnpassant(game, from, direction) {
        return ChessMove.isOtherTeam(game, direction(game.board[from])) &&
            ChessPiece.isPawn(game, direction(game.board[from])) &&
            ChessMove.getType(game.history.lastMove()) === ChessMove.PAWN_DOUBLE_PUSH
    }

    static captureEnpassant(direction) {
        return function (game, from, to) {
            game.moves[ChessMove.key(from, to)] = ChessMove.create(from, to, from, direction(game.board[from]))
        }
    }

    static getMoves(game, from) {
        if (!game.history.moved.has(game.board[from]))
            ChessMove.find(game, from, Pawn.doublePush, 1, ChessMove.empty, ChessMove.noop)

        if (Pawn.isEnpassant(game, from, ChessPiece.left))
            ChessMove.find(game, from, ChessPiece.forwardLeft, 1, Pawn.captureEnpassant(ChessPiece.left), ChessMove.noop)

        if (Pawn.isEnpassant(game, from, ChessPiece.right))
            ChessMove.find(game, from, ChessPiece.forwardRight, 1, Pawn.captureEnpassant(ChessPiece.right), ChessMove.noop)

        ChessMove.find(game, from, ChessPiece.forward, 1, ChessMove.empty, ChessMove.noop)
        ChessMove.find(game, from, ChessPiece.forwardLeft, 1, ChessMove.noop)
        ChessMove.find(game, from, ChessPiece.forwardRight, 1, ChessMove.noop)
    }
}
