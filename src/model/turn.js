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
        ])
    ) {
        this.team = team
        this.board = board
    }

    getMoves() {
        const moves = []

        for (let index = 0; index < this.board.length; index++) {
            const piece = this.board[index]

            if (piece && piece.team === this.team)
                moves.push(...piece.getMoves(this, index))
        }

        return moves
    }

    makeMove(from, to) {
        const game = this.clone()
        const moves = this.getMoves()

        for (const move of moves) {
            if (move.from === from && move.to === to) {
                game.turn = game.turn === ChessPiece.WHITE
                    ? ChessPiece.BLACK
                    : ChessPiece.WHITE

                game.board[to] = game.board[from]
                game.board[from] = 0

                break
            }
        }

        return game
    }

    clone() {
        return new ChessTurn(this.team, this.board.slice())
    }
}
