import ChessTeam from './team'
import ChessBoard from '../board'

export default class ChessGame {
    constructor() {
        this.black = new ChessTeam(ChessTeam.BLACK)
        this.white = new ChessTeam(ChessTeam.WHITE)

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
const pawn = game.turn[8]

console.log(pawn)

pawn.getMoves(game.board)
