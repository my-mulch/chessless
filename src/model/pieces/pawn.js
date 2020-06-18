import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Pawn {
    static getMoves(game, from) {
        ChessMove.move(game, from, ChessPiece.forward, 2, ChessMove.empty, ChessMove.noop)
        ChessMove.move(game, from, ChessPiece.forwardLeft, 1, ChessMove.noop)
        ChessMove.move(game, from, ChessPiece.forwardRight, 1, ChessMove.noop)
    }
}
