import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game, moves, level, from) {
        ChessMove.find({ type: ChessMove.BISHOP, game, moves, level, from, movement: ChessPiece.forwardLeft })
        ChessMove.find({ type: ChessMove.BISHOP, game, moves, level, from, movement: ChessPiece.forwardRight })
        ChessMove.find({ type: ChessMove.BISHOP, game, moves, level, from, movement: ChessPiece.backwardLeft })
        ChessMove.find({ type: ChessMove.BISHOP, game, moves, level, from, movement: ChessPiece.backwardRight })
    }
}
