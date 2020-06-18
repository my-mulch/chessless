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

        static move(game, from, direction,
            steps = Infinity, // how many steps we take in given direction
            step = ChessMove.empty, // step determines what to do while we travel outward from a piece
            end = ChessMove.capture, // end determines what we do once we've reached a piece
        ) {
            let to = direction(game.board[from], from)

            let s = 0
            while (game.board[to] === 0 && s < steps) {
                step(game, from, to)
                to = direction(game.board[from], to)
                s++
            }

            return end(game, from, to, direction)
        }

        static empty(game, from, to) {
            game.moves.push(ChessMove.create(from, to, game.board[from]))
        }

        static capture(game, from, to) {
            if (game.board[to] === 0)
                return

            const toTeam = ChessPiece.getTeam(game.board[to])
            const fromTeam = ChessPiece.getTeam(game.board[from])

            if (toTeam !== fromTeam)
                game.moves.push(ChessMove.create(from, to, game.board[from]))
        }

        static noop() { }
    })
