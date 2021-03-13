import ChessPiece from '../piece.js'

export default class Bishop extends ChessPiece {
    getMoves(square, board, history) {
        return [
            ...super.getMoves(square, board, history, super.moveForwardLeft.bind(this)),
            ...super.getMoves(square, board, history, super.moveForwardRight.bind(this)),
            ...super.getMoves(square, board, history, super.moveBackwardLeft.bind(this)),
            ...super.getMoves(square, board, history, super.moveBackwardRight.bind(this))
        ]
    }
}
