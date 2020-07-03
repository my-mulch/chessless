import ChessMove from './move'
import ChessTurn from './turn'
import ChessTeam from './team'
import ChessBoard from './board'
import ChessPiece from './piece'
import ChessHistory from './history'

import Pawn from './pieces/pawn'
import Rook from './pieces/rook'
import King from './pieces/king'
import Queen from './pieces/queen'
import Bishop from './pieces/bishop'
import Knight from './pieces/knight'

export default class ChessGame {
    static PIECES = {
        [ChessPiece.PAWN]: Pawn,
        [ChessPiece.ROOK]: Rook,
        [ChessPiece.KNIGHT]: Knight,
        [ChessPiece.BISHOP]: Bishop,
        [ChessPiece.QUEEN]: Queen,
        [ChessPiece.KING]: King
    }

    constructor(
        board = new ChessBoard([
            ...ChessTeam.init(ChessPiece.WHITE),
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            ...ChessTeam.init(ChessPiece.BLACK)
        ]),
        turn = new ChessTurn(ChessPiece.WHITE),
        history = new ChessHistory(),
    ) {
        this.turn = turn
        this.board = board
        this.history = history
    }

    isEmptySquare(square) {
        return this.board[square] === 0
    }

    isOutOfBoundsSquare(square) {
        return this.board[square] === undefined
    }

    isOtherTeamSquare(square) {
        return ChessPiece.unpack(this.board[square]).team !== this.turn.team
    }

    considerMove(to) {
        this.turn.addMove(new ChessMove(this.turn.from, to))
    }

    getMoves() {
        for (let from = 0; from < this.board.length; from++) {
            this.turn.from = from
            this.turn.piece = this.board[from]

            if (!this.isEmptySquare(from) &&
                !this.isOutOfBoundsSquare(from) &&
                !this.isOtherTeamSquare(from))
                ChessGame.PIECES[type].getMoves(this)
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
