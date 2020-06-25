import ChessMove from '../move'
import ChessPiece from '../piece'

export default class King {
    static getMoves(game, moves, level, from) {
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.left, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.right, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.forward, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.backward, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.forwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.forwardRight, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.backwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.backwardRight, steps: 1 })
    }
}
