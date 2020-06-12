import ChessPiece from './piece'

export default class ChessMove {
    static TO_BIT = 0
    static GET_TO = 63
    static CLEAR_TO = 65472

    static FROM_BIT = 6
    static GET_FROM = 4032
    static CLEAR_FROM = 61503

    static ID_BIT = 12
    static GET_ID = 61440
    static CLEAR_ID = 4095

    static create(from, to, id) {
        let move = 0

        move = ChessMove.setId(move, id)
        move = ChessMove.setTo(move, to)
        move = ChessMove.setFrom(move, from)

        return move
    }

    // Getters and setters
    static getTo(move) { return move & ChessMove.GET_TO }
    static setTo(move, to) { return (move & ChessMove.CLEAR_TO) | to }

    static getFrom(move) { return (move & ChessMove.GET_FROM) >> ChessMove.FROM_BIT }
    static setFrom(move, from) { return (move & ChessMove.CLEAR_FROM) | (from << ChessMove.FROM_BIT) }

    static getId(move) { return (move & ChessMove.GET_ID) >> ChessMove.ID_BIT }
    static setId(move, id) { return (move & ChessMove.CLEAR_ID) | (id << ChessMove.ID_BIT) }

    // Move checks
    static isEmptySquareOrOtherTeam(piece, square) {
        return square !== undefined
            && (!square || // is empty
                ChessPiece.getTeam(square) !== ChessPiece.getTeam(piece))
    }

    static isOtherTeam(piece, square) {
        return square !== undefined
            && square
            && ChessPiece.getTeam(square) !== ChessPiece.getTeam(piece)
    }

    static putsKingInCheck(game, piece, from, to) {


    }


    // Queen, Rook, and Bishop
    static getLines(game, piece, from, direction) {
        const moves = []

        let to = direction(piece, from)
        while (ChessMove.isEmptySquareOrOtherTeam(piece, game.board[to])
            && !ChessMove.putsKingInCheck(game, piece, from, to)) {
            moves.push(ChessMove.create(from, to))
            to = direction(piece, to)
        }

        return moves
    }

    static [ChessPiece.BISHOP](game, piece, from) {
        return [
            ...ChessMove.getLines(game, piece, from, ChessPiece.forwardLeft),
            ...ChessMove.getLines(game, piece, from, ChessPiece.forwardRight),
            ...ChessMove.getLines(game, piece, from, ChessPiece.backwardLeft),
            ...ChessMove.getLines(game, piece, from, ChessPiece.backwardRight),
        ]
    }

    static [ChessPiece.ROOK](game, piece, from) {
        return [
            ...ChessMove.getLines(game, piece, from, ChessPiece.left),
            ...ChessMove.getLines(game, piece, from, ChessPiece.right),
            ...ChessMove.getLines(game, piece, from, ChessPiece.forward),
            ...ChessMove.getLines(game, piece, from, ChessPiece.backward),
        ]
    }

    static [ChessPiece.QUEEN](game, piece, from) {
        return [
            ...ChessMove.getLines(game, piece, from, ChessPiece.left),
            ...ChessMove.getLines(game, piece, from, ChessPiece.right),
            ...ChessMove.getLines(game, piece, from, ChessPiece.forward),
            ...ChessMove.getLines(game, piece, from, ChessPiece.backward),
            ...ChessMove.getLines(game, piece, from, ChessPiece.forwardLeft),
            ...ChessMove.getLines(game, piece, from, ChessPiece.forwardRight),
            ...ChessMove.getLines(game, piece, from, ChessPiece.backwardLeft),
            ...ChessMove.getLines(game, piece, from, ChessPiece.backwardRight),
        ]
    }

    // Knight
    static [ChessPiece.KNIGHT](game, piece, from) {
        const squares = [
            ChessPiece.left(piece, ChessPiece.forward(piece, from, 2)),
            ChessPiece.right(piece, ChessPiece.forward(piece, from, 2)),

            ChessPiece.forward(piece, ChessPiece.right(piece, from, 2)),
            ChessPiece.backward(piece, ChessPiece.right(piece, from, 2)),

            ChessPiece.left(piece, ChessPiece.backward(piece, from, 2)),
            ChessPiece.right(piece, ChessPiece.backward(piece, from, 2)),

            ChessPiece.forward(piece, ChessPiece.left(piece, from, 2)),
            ChessPiece.backward(piece, ChessPiece.left(piece, from, 2)),
        ]

        const knightMoves = (to) => ChessMove.isEmptySquareOrOtherTeam(piece, game.board[to])
        const moves = (to) => ChessMove.create(from, to)

        return squares.filter(knightMoves).map(moves)
    }

    // King
    static [ChessPiece.KING](game, piece, from) {
        return []
    }

    // Pawn
    static [ChessPiece.PAWN](game, piece, from) {
        return [
            ...ChessMove.pawnCapture(game, piece, from),
            ...ChessMove.pawnSinglePush(game, piece, from),
            ...ChessMove.pawnDoublePush(game, piece, from),
        ]
    }

    static pawnCapture(game, piece, from) {
        const squares = [
            ChessPiece.forwardLeft(piece, from),
            ChessPiece.forwardRight(piece, from)
        ]

        const captures = (to) => ChessMove.isOtherTeam(piece, game.board[to])
        const moves = (to) => ChessMove.create(from, to)

        return squares.filter(captures).map(moves)
    }

    static pawnSinglePush(game, piece, from) {
        const squares = [ChessPiece.forward(piece, from)]

        const squareIsEmpty = (to) => !game.board[to]
        const moves = (to) => ChessMove.create(from, to)

        return squares.filter(squareIsEmpty).map(moves)
    }

    static pawnDoublePush(game, piece, from) {
        const squares = [
            ChessPiece.forward(piece, from, 1),
            ChessPiece.forward(piece, from, 2)
        ]

        const squareIsEmpty = (to) => !game.board[to]
        const to = ChessPiece.forward(piece, from, 2)

        return squares.every(squareIsEmpty)
            ? [ChessMove.create(from, to)]
            : []
    }
}
