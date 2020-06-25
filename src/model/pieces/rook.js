import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Rook {
    static getMoves(game, moves, level, from) {
        ChessMove.find({ type: ChessMove.ROOK, game, moves, level, from, movement: ChessPiece.left })
        ChessMove.find({ type: ChessMove.ROOK, game, moves, level, from, movement: ChessPiece.right })
        ChessMove.find({ type: ChessMove.ROOK, game, moves, level, from, movement: ChessPiece.forward })
        ChessMove.find({ type: ChessMove.ROOK, game, moves, level, from, movement: ChessPiece.backward })
    }
}
