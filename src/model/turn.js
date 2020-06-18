import ChessMove from './move'
import ChessTeam from './team'
import ChessBoard from './board'
import ChessPiece from './piece'

export default class ChessTurn {
    constructor(
        team = ChessPiece.WHITE,
        board = new ChessBoard([
            ...ChessTeam.init(ChessPiece.WHITE),
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            ...ChessTeam.init(ChessPiece.BLACK)
        ]),
        moves = null,
        history = []
    ) {
        this.team = team
        this.board = board
        this.history = history
        this.moves = moves || this.getMoves(this.team)
    }

    sauce() {
        debugger

        this.getMoves()
    }

    getMoves(team) {
        const moves = []

        for (let index = 0; index < this.board.length; index++) {
            const piece = this.board[index]
            const type = ChessPiece.getType(piece)

            if (!piece || ChessPiece.getTeam(piece) !== team)
                continue

            moves.push(...ChessMove[type](this, piece, index))
        }

        return new Set(moves)
    }

    makeMove(from, to) {
        const game = this.clone()

        const piece = game.board[from]
        const move = ChessMove.create(from, to, piece)
        const distance = to - from

        if (!game.moves.has(move))
            return game

        this.history.push(move)

        game.board[to] = game.board[from]
        game.board[from] = 0
        game.team = Number(!game.team)

        if (distance === 2 && ChessPiece.getType(piece) === ChessPiece.KING) {
            const rook = game.board[to + 1]
            game.board[from + 1] = rook
            game.board[to + 1] = 0
        }

        if (distance === -2 && ChessPiece.getType(piece) === ChessPiece.KING) {
            const rook = game.board[to - 2]
            game.board[from - 1] = rook
            game.board[to - 2] = 0
        }

        game.moves = game.getMoves(game.team)

        return game
    }

    clone() {
        return new ChessTurn(
            this.team,
            this.board.slice(),
            new Set(this.moves),
            this.history
        )
    }
}
