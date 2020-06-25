import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen {
    static getMoves(game, from) {
        ChessMove.find({ game, from, movement: ChessPiece.left })
        ChessMove.find({ game, from, movement: ChessPiece.right })
        ChessMove.find({ game, from, movement: ChessPiece.forward })
        ChessMove.find({ game, from, movement: ChessPiece.backward })
        ChessMove.find({ game, from, movement: ChessPiece.forwardLeft })
        ChessMove.find({ game, from, movement: ChessPiece.forwardRight })
        ChessMove.find({ game, from, movement: ChessPiece.backwardLeft })
        ChessMove.find({ game, from, movement: ChessPiece.backwardRight })
    }
}
