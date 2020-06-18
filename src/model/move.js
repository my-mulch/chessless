import ChessPiece from './piece'
import { numeric } from './utils'

export default numeric({
    To: [6, 0],
    From: [12, 6],
    Piece: [20, 12],
    Type: [24, 20]
}, class ChessMove {
        static create(from, to, piece, type = 0) {
            let move = 0

            move = ChessMove.setTo(move, to)
            move = ChessMove.setFrom(move, from)
            move = ChessMove.setType(move, type)
            move = ChessMove.setPiece(move, piece)

            return move
        }

        static toString(move) {
            const to = ChessMove.getTo(move)
            const from = ChessMove.getFrom(move)
            const piece = ChessMove.getPiece(move)

            return `${ChessPiece.toString(piece)}: ${to}-${from}`
        }

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

        static isEmptySquare(square) {
            return square === 0
        }

        static putsKingInCheck(game, piece, from, to) {
            return false
        }


        // Queen, Rook, and Bishop
        static getLines(game, piece, from, direction) {
            const moves = []

            let to = direction(piece, from)
            while (ChessMove.isEmptySquare(game.board[to])
                && !ChessMove.putsKingInCheck(game, piece, from, to)) {

                moves.push(ChessMove.create(from, to, piece))
                to = direction(piece, to)
            }

            if (ChessMove.isOtherTeam(piece, game.board[to]))
                moves.push(ChessMove.create(from, to, piece))

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

        static castleQueenSide(game, piece, from) {
            if (ChessMove.putsKingInCheck(game))
                return []

            const rookSquare = ChessPiece.queenSide(piece, from, 4)
            const rook = game.board[rookSquare]

            if (!rook ||
                ChessPiece.getType(rook) !== ChessPiece.ROOK ||
                game.history.filter(move => ChessMove.getPiece(move) === rook).length)
                return []

            const squares = [
                ChessPiece.queenSide(piece, from, 1),
                ChessPiece.queenSide(piece, from, 2),
            ]

            const safeMoves = (to) =>
                ChessMove.isEmptySquare(game.board[to]) &&
                !ChessMove.putsKingInCheck(game, piece, from, to)

            if (squares.filter(safeMoves).length !== 2)
                return []

            return [ChessMove.create(from, squares[1], piece)]
        }

        static castleKingSide(game, piece, from) {
            if (ChessMove.putsKingInCheck(game))
                return []

            const rookSquare = ChessPiece.kingSide(piece, from, 3)
            const rook = game.board[rookSquare]

            if (!rook ||
                ChessPiece.getType(rook) !== ChessPiece.ROOK ||
                game.history.filter(move => ChessMove.getPiece(move) === rook).length)
                return []

            const squares = [
                ChessPiece.kingSide(piece, from, 1),
                ChessPiece.kingSide(piece, from, 2)
            ]

            const safeMoves = (to) =>
                ChessMove.isEmptySquare(game.board[to]) &&
                !ChessMove.putsKingInCheck(game, piece, from, to)

            if (squares.filter(safeMoves).length !== 2)
                return []

            return [ChessMove.create(from, squares[1], piece)]
        }

        static [ChessPiece.KING](game, piece, from) {
            const squares = [
                ChessPiece.left(piece, from),
                ChessPiece.right(piece, from),
                ChessPiece.forward(piece, from),
                ChessPiece.backward(piece, from),
                ChessPiece.forwardLeft(piece, from),
                ChessPiece.backwardLeft(piece, from),
                ChessPiece.forwardRight(piece, from),
                ChessPiece.backwardRight(piece, from),
            ]

            const safeMoves = (to) =>
                ChessMove.isEmptySquareOrOtherTeam(piece, game.board[to]) &&
                !ChessMove.putsKingInCheck(game, piece, from, to)

            const moves = (to) => ChessMove.create(from, to, piece)

            return [
                ...squares.filter(safeMoves).map(moves),
                ...ChessMove.castleKingSide(game, piece, from),
                ...ChessMove.castleQueenSide(game, piece, from),
            ]
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

            const squareIsEmpty = (to) => ChessMove.isEmptySquare(game.board[to])
            const moves = (to) => ChessMove.create(from, to, piece)

            return squares.filter(squareIsEmpty).map(moves)
        }

        static pawnDoublePush(game, piece, from) {
            if (game.history.filter(function (move) {
                const curPiece = piece
                const oldPiece = ChessMove.getPiece(move)

                return curPiece === oldPiece
            }).length)
                return []

            const squares = [
                ChessPiece.forward(piece, from, 1),
                ChessPiece.forward(piece, from, 2)
            ]

            const squareIsEmpty = (to) => ChessMove.isEmptySquare(game.board[to])
            const to = ChessPiece.forward(piece, from, 2)

            return squares.every(squareIsEmpty)
                ? [ChessMove.create(from, to, piece)]
                : []
        }
    })
