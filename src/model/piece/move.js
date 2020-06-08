import ChessPiece from './index'

export default class ChessMove {
    static TO_BIT = 4
    static FROM_BIT = 10
    static TYPE_BIT = 0

    static TO_MASK = 64527
    static FROM_MASK = 1023
    static TYPE_MASK = 131056

    static MIN_TYPE = 0
    static MAX_TYPE = 15

    // Move Types
    static PAWN_SINGLE_PUSH = 0
    static PAWN_DOUBLE_PUSH = 1
    static PAWN_ENPASSANT = 2
    static PAWN_CAPTURE = 3

    static ROOK = 4
    static KNIGHT = 5
    static BISHOP = 6
    static QUEEN = 7

    static KING = 8
    static CASTLE = 9

    static create(from, to, type) {
        let move = 0

        move = ChessMove.setTo(move, to)
        move = ChessMove.setFrom(move, from)
        move = ChessMove.setType(move, type)

        return move
    }
    static getTo(move) {
        return (move & ChessMove.FROM_MASK) >> ChessMove.TO_BIT
    }

    static setTo(move, to) {
        return (to << ChessMove.TO_BIT) | (move & ChessMove.TO_MASK)
    }

    static getFrom(move) {
        return move >> ChessMove.FROM_BIT
    }

    static setFrom(move, from) {
        return (from << ChessMove.FROM_BIT) | (move & ChessMove.FROM_MASK)
    }

    static getType(move) {
        return move & ChessMove.MAX_TYPE
    }

    static setType(move, type) {
        return type | (move & ChessMove.TYPE_MASK)
    }

    static isEmptySquareOrOtherTeam(square, piece) {
        return square !== undefined
            && (square || // is empty
                ChessPiece.getTeam(square) !== ChessPiece.getTeam(piece))
    }

    static isOtherTeam(square, piece) {
        return square !== undefined
            && square
            && ChessPiece.getTeam(square) !== ChessPiece.getTeam(piece)
    }
}

