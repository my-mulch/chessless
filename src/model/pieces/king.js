import ChessMove from '../move'
import ChessPiece from '../piece'

export default class King {
    static getMoves(game, from) {
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.left, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.right, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.forward, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.backward, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.forwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.forwardRight, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.backwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, from, movement: ChessPiece.backwardRight, steps: 1 })
    }
}
