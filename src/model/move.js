
export default class ChessMove {
    constructor(from, to) {
        this.to = to
        this.from = from
    }

    static lineMoveHelper(game, piece, from, nextRank, nextFile) {
        const moves = []
        const ChessBoard = game.board.constructor
        const [rank, file] = ChessBoard.rankAndFileOf(from)

        let i = 1
        while (true) {
            const to = ChessBoard.indexOf(
                nextRank(rank, i),
                nextFile(file, i)
            )

            const square = game.board[to]

            if (square === undefined || (square && square.team === piece.team))
                break

            moves.push(new ChessMove(from, to))

            i++
        }

        return moves
    }

    static diagonals(game, piece, from) {
        return [
            ...this.lineMoveHelper(game, piece, from, piece.next.bind(piece), piece.next.bind(piece)),
            ...this.lineMoveHelper(game, piece, from, piece.next.bind(piece), piece.prev.bind(piece)),
            ...this.lineMoveHelper(game, piece, from, piece.prev.bind(piece), piece.prev.bind(piece)),
            ...this.lineMoveHelper(game, piece, from, piece.prev.bind(piece), piece.next.bind(piece)),
        ]
    }
}

