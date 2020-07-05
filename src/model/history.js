
export default class ChessHistory {
    constructor() {
        this.moves = []
        this.boards = []
        this.moved = new Set()
    }

    add(board, move) {
        this.moves.push(move)
        this.boards.push(board)

        // The piece has moved
        this.moved.add(board[move.from].id)
    }

    lastMove() {
        return this.moves[this.moves.length - 1]
    }
}
