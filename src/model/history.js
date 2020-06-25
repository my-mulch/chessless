
export default class ChessHistory {
    constructor() {
        this.moves = []
        this.moved = new Set()
        this.boards = []
    }

    add(board, move) {
        this.moves.push(move)
        this.boards.push(board)

        // The piece has moved
        this.moved.add(board[move.from])
    }

    lastMove() {
        return this.moves[this.moves.length - 1]
    }
}
