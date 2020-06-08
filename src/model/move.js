import ChessPiece from './piece'

export default class ChessMove {
    static TO_BIT = 4
    static FROM_BIT = 10
    static TYPE_BIT = 0

    static TO_MASK = 64527
    static FROM_MASK = 1023
    static TYPE_MASK = 131056

    static create(from, to, type) {
        let move = 0

        move = ChessMove.setTo(move, to)
        move = ChessMove.setFrom(move, from)
        move = ChessMove.setType(move, type)

        return move
    }

    // Getters and setters
    static getTo(move) { return (move & ChessMove.FROM_MASK) >> ChessMove.TO_BIT }
    static setTo(move, to) { return (to << ChessMove.TO_BIT) | (move & ChessMove.TO_MASK) }

    static getFrom(move) { return move >> ChessMove.FROM_BIT }
    static setFrom(move, from) { return (from << ChessMove.FROM_BIT) | (move & ChessMove.FROM_MASK) }

    static getType(move) { return move & ChessMove.MAX_TYPE }
    static setType(move, type) { return type | (move & ChessMove.TYPE_MASK) }

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


    // Queen, Rook, and Bishop
    static getLines(game, piece, from, direction) {
        const moves = []
        
        let to = direction(piece, from)
        while (ChessMove.isEmptySquareOrOtherTeam(piece, game.board[to])) {
            moves.push(ChessMove.create(from, to, piece))
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
        const moves = (to) => ChessMove.create(from, to, piece)

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
        const moves = (to) => ChessMove.create(from, to, piece)

        return squares.filter(captures).map(moves)
    }

    static pawnSinglePush(game, piece, from) {
        const squares = [ChessPiece.forward(piece, from)]

        const squareIsEmpty = (to) => !game.board[to]
        const moves = (to) => ChessMove.create(from, to, piece)

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
            ? [ChessMove.create(from, to, piece)]
            : []
    }
}
