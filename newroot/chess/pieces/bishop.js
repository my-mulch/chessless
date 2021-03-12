import ChessPiece from '../piece.js'

export default class Bishop extends ChessPiece {
    getMoves(square, board) {
        return {
            ...super.getMoves(square, board, super.moveForwardLeft.bind(this)),
            ...super.getMoves(square, board, super.moveForwardRight.bind(this)),
            ...super.getMoves(square, board, super.moveBackwardLeft.bind(this)),
            ...super.getMoves(square, board, super.moveBackwardRight.bind(this))
        }
    }
}
