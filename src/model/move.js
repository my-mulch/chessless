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
        
        static create(
            fromPrimary,
            toPrimary,
            fromSecondary = fromPrimary,
            toSecondary = fromPrimary,
            type
        ) {
            let move = 0

            move = ChessMove.setFromPrimary(move, fromPrimary)
            move = ChessMove.setToPrimary(move, toPrimary)
            move = ChessMove.setFromSecondary(move, fromSecondary)
            move = ChessMove.setToSecondary(move, toSecondary)
            move = ChessMove.setType(move, type)

            return move
        }

        static unpack(move) {
            return [
                ChessMove.getFromPrimary(move),
                ChessMove.getToPrimary(move),
                ChessMove.getFromSecondary(move),
                ChessMove.getToSecondary(move),
                ChessMove.getType(move)
            ]
        }

        static key(from, to) {
            return ChessMove.create(from, to, null, null)
        }

        static find(
            game, // the current game object
            from, // where we are moving from
            direction, // how the piece moves
            steps = Infinity, // how many steps we take in given direction
            stepFn = ChessMove.emptyMove, // stepFn determines what to do while we travel outward from a piece
            endFn = ChessMove.captureMove, // endFn determines what we do once we've reached a piece
        ) {
            let to = direction(game.board[from], from)

            let s = 0
            while (game.board[to] === 0 && s < steps) {
                stepFn(game, from, to)
                to = direction(game.board[from], to)
                s++
            }

            return endFn(game, from, to, direction)
        }

        static makeMove(game, move) {
            const [fromPrimary, toPrimary, fromSecondary, toSecondary] = ChessMove.unpack(move)

            game.board[toPrimary] = game.board[fromPrimary]
            game.board[fromPrimary] = 0

            game.board[toSecondary] = game.board[fromSecondary]
            game.board[fromSecondary] = 0
        }

        static isOtherTeam(game, from) {

        }

        static emptyMove(game, from, to) {
            game.moves[ChessMove.key(from, to)] = ChessMove.create(from, to)
        }

        static captureMove(game, from, to) {
            if (game.board[to] === 0)
                return

            const toTeam = ChessPiece.getTeam(game.board[to])
            const fromTeam = ChessPiece.getTeam(game.board[from])

            if (toTeam !== fromTeam)
                game.moves[ChessMove.key(from, to)] = ChessMove.create(from, to)
        }

        static noop() { }
    })
