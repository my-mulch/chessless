import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Bishop extends ChessPiece {
    getMoves(piece, square, board) {
        return {
            ...this.find(piece, square, board, this.moveForwardLeft),
            ...this.find(piece, square, board, this.moveForwardRight),
            ...this.find(piece, square, board, this.moveBackwardLeft),
            ...this.find(piece, square, board, this.moveBackwardRight),
        }
    }
}
