import ChessMove from './move'
import ChessTurn from './turn'
import ChessTeam from './team'
import ChessBoard from './board'
import ChessPiece from './piece'
import ChessHistory from './history'

import King from './pieces/king'

import { promotionPrompt } from './utils'

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

    // Misc
    otherTeam() { return ChessTeam.switch(this.turn.team) }
    clone() { return new ChessGame(this.turn.clone(), this.board.slice(), this.history) }

    // Square Checks
    isEmptySquare(square) { return this.board[square] === null }
    isOutOfBoundsSquare(square) { return this.board[square] === undefined }
    isSameTeamSquare(square) { return this.board[square] && this.board[square].team === this.turn.team }
    isOtherTeamSquare(square) { return this.board[square] && this.board[square].team !== this.turn.team }

    // Turn & Moves
    getKing(team = this.turn.team) {
        for (let i = 0; i < this.board.length; i++)
            if (this.board[i] &&
                this.board[i].team === team &&
                this.board[i].constructor === King)
                return i
    }

    getOtherTeamMoves() {
        const newGame = this.clone()
        const seekingCheck = true

        newGame.turn = new ChessTurn(this.otherTeam(), seekingCheck)

        return newGame.getMoves()
    }

    kingIsInCheck() {
        const newGame = this.getOtherTeamMoves()

        return Boolean(newGame.turn.moves[this.getKing()])
    }

    considerMove(to, special) {
        const move = new ChessMove(this.turn.from, to, special)

        if (!move.resultsInCheck(this))
            this.turn.addMove(move)
    }

    hasMoves() { return Boolean(Object.keys(this.turn.moves).length) }

    getMoves() {
        if (this.hasMoves()) return this

        for (let from = 0; from < this.board.length; from++) {
            this.turn.from = from

            if (this.board[from] && this.isSameTeamSquare(from))
                this.board[from].getMoves(this)
        }

        return this
    }

    makeMove(from, to, promote) {
        const game = this.clone().getMoves()

        // Checkmate
        if (!game.hasMoves()) return false

        // Lookup corresponding move
        const selectedMove = game.turn.getMove(from, to)

        // If there is no corresponding move, do nothing
        if (!selectedMove) return game

        // Select the move (possible promotion)
        const move = promote

        // Save the board and move
        this.history.add(this.board, move)

        // Make the move
        move.make(game)

        // Switch teams
        game.turn = new ChessTurn(this.otherTeam())

        return game
    }
}
