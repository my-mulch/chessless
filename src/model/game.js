import ChessMove from './move'
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
        team = ChessPiece.WHITE,
        board = new ChessBoard([
            ...ChessTeam.init(ChessPiece.WHITE),
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            ...ChessTeam.init(ChessPiece.BLACK)
        ]),
        history = new ChessHistory()
    ) {
        this.team = team
        this.board = board
        this.history = history

        this.getMoves()
    }

    getMoves() {
        this.moves = {}

        for (let index = 0; index < this.board.length; index++) {
            const piece = this.board[index]
            const type = ChessPiece.getType(piece)

            if (!piece || ChessPiece.getTeam(piece) !== this.team)
                continue

            ChessGame.PIECES[type].getMoves(this, index)
        }
    }

    makeMove(from, to) {
        const game = this.clone()
        const move = game.moves[ChessMove.key(from, to)]

        console.log(move)
        if (!move) return game

        // Save the board and move
        this.history.add(this.board, move)

        // Make the move
        ChessMove.makeMove(game, move)

        // Switch teams
        game.team = Number(!game.team)

        return game
    }

    clone() {
        return new ChessGame(
            this.team,
            this.board.slice(),
            this.history
        )
    }
}
