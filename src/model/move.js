import ChessPiece from './piece'
import { numeric } from './utils'

export default numeric({
    Type: [32, 24],
    FromSecondary: [24, 18],
    ToSecondary: [18, 12],
    FromPrimary: [12, 6],
    ToPrimary: [6, 0]
}, class ChessMove {
        static PAWN_DOUBLE_PUSH = 1
        static PAWN_SINGLE_PUSH = 2
        static PAWN_CAPTURE = 3
        static ENPASSANT = 4
        static PROMOTION = 5
        static ROOK = 6
        static KNIGHT = 7
        static BISHOP = 8
        static QUEEN = 9
        static KING = 10
        static CASTLE = 11

        static key(from, to) {
            return ChessMove.create({ fromPrimary: from, toPrimary: to })
        }

        static find({
            type, // the move type we are trying to find
            game, // the current game object
            from, // where we are moving from
            movement, // how the piece moves
            steps = Infinity, // how many steps we take in given direction
            stepFn = ChessMove.emptyMove, // stepFn determines what to do while we travel outward from a piece
            endFn = ChessMove.captureMove, // endFn determines what we do once we've reached a piece
        }) {
            let to = movement(game.board[from], from)

            let s = 0
            while (game.board[to] === 0 && s < steps) {
                stepFn(type, game, from, to)
                to = movement(game.board[from], to)
                s++
            }

            return endFn(type, game, from, to)
        }

        static makeMove(game, move) {
            move = ChessMove.unpack(move)

            game.board[move.toPrimary] = game.board[move.fromPrimary]
            game.board[move.fromPrimary] = 0

            if (!move.toSecondary && !move.fromSecondary)
                return

            game.board[move.toSecondary] = game.board[move.fromSecondary]
            game.board[move.fromSecondary] = 0
        }

        static isOtherTeam(game, from) {
            return game.team !== ChessPiece.getTeam(game.board[from])
        }

        static emptyMove(type, game, from, to) {
            game.moves[ChessMove.key(from, to)] = ChessMove.create({
                type,
                fromPrimary: from,
                toPrimary: to
            })
        }

        static captureMove(type, game, from, to) {
            if (game.board[to] === 0)
                return

            const toTeam = ChessPiece.getTeam(game.board[to])
            const fromTeam = ChessPiece.getTeam(game.board[from])

            if (toTeam !== fromTeam)
                game.moves[ChessMove.key(from, to)] = ChessMove.create({
                    type,
                    fromPrimary: from,
                    toPrimary: to
                })
        }

        static noop() { }
    })
