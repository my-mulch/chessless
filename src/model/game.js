import ChessMove from './move'
import ChessTurn from './turn'
import ChessTeam from './team'
import ChessBoard from './board'
import ChessPiece from './piece'
import ChessHistory from './history'

export default class ChessGame {
    constructor(
        turn = new ChessTurn(ChessPiece.WHITE),
        board = new ChessBoard(
            ...ChessTeam.init(ChessPiece.WHITE),
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            ...ChessTeam.init(ChessPiece.BLACK)
        ),
        history = new ChessHistory(),
    ) {
        this.turn = turn
        this.board = board
        this.history = history
    }

    isEmptySquare(square) {
        return this.board[square] === null
    }

    isOutOfBoundsSquare(square) {
        return this.board[square] === undefined
    }

    isSameTeamSquare(square) {
        return this.board[square] && this.board[square].team === this.turn.team
    }

    isOtherTeamSquare(square) {
        return this.board[square] && this.board[square].team !== this.turn.team
    }

    considerMove(to, special) {
        this.turn.addMove(new ChessMove(this.turn.from, to, special))
    }

    getMoves() {
        for (let from = 0; from < this.board.length; from++) {
            this.turn.from = from

            if (this.board[from] && this.isSameTeamSquare(from))
                this.board[from].getMoves(this)
        }

        return this.turn
    }

    makeMove(from, to) {
        const game = this.clone()
        const turn = game.getMoves()
        const move = turn.getMove(from, to)

        if (!move) return game

        // Save the board and move
        this.history.add(this.board, move)

        // Make the move
        move.make(game)

        // Switch teams
        game.turn = new ChessTurn(ChessTeam.switch(this.turn.team))

        return game
    }

    clone() {
        return new ChessGame(
            this.turn,
            this.board.slice(),
            this.history
        )
    }
}
