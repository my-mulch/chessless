import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Rook {
    static getMoves(game, from) {
        ChessMove.find({ type: ChessMove.ROOK, game, from, movement: ChessPiece.left })
        ChessMove.find({ type: ChessMove.ROOK, game, from, movement: ChessPiece.right })
        ChessMove.find({ type: ChessMove.ROOK, game, from, movement: ChessPiece.forward })
        ChessMove.find({ type: ChessMove.ROOK, game, from, movement: ChessPiece.backward })
    }
}
