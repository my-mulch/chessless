import ChessTeam from './team'
import ChessBoard from '../board'
import ChessPiece from '../pieces/piece'

export default class ChessGame {
    constructor() {
        this.black = new ChessTeam(ChessPiece.BLACK)
        this.white = new ChessTeam(ChessPiece.WHITE)

        this.turn = this.white

        this.board = new ChessBoard([
            ...this.white,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            ...this.black
        ])
    }

    changeTurn() {
        this.turn = this.white ? this.black : this.white
    }

    getMoves() {
        return this.turn.getMoves(this.board)
    }
}

const game = new ChessGame()

const moves = game.turn.getMoves(game)

console.log(moves)