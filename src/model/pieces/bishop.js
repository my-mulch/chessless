import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop {
    static getMoves(game, from) {
        ChessMove.find({ game, from, movement: ChessPiece.forwardLeft })
        ChessMove.find({ game, from, movement: ChessPiece.forwardRight })
        ChessMove.find({ game, from, movement: ChessPiece.backwardLeft })
        ChessMove.find({ game, from, movement: ChessPiece.backwardRight })
    }
}
