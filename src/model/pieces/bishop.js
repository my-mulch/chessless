import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game, from) {
        ChessMove.find({ type: ChessMove.BISHOP, game, from, movement: ChessPiece.forwardLeft })
        ChessMove.find({ type: ChessMove.BISHOP, game, from, movement: ChessPiece.forwardRight })
        ChessMove.find({ type: ChessMove.BISHOP, game, from, movement: ChessPiece.backwardLeft })
        ChessMove.find({ type: ChessMove.BISHOP, game, from, movement: ChessPiece.backwardRight })
    }
}
