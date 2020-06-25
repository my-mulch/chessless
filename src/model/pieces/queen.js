import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Queen {
    static getMoves(game, from) {
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.left })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.right })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.forward })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.backward })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.forwardLeft })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.forwardRight })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.backwardLeft })
        ChessMove.find({ type: ChessMove.QUEEN, game, from, movement: ChessPiece.backwardRight })
    }
}
