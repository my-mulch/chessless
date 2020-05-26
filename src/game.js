import ChessTeam from './team.js'
import ChessBoard from './board.js'

export default class ChessGame {
    constructor() {
        this.turn = ChessTeam.WHITE

        this.white = new ChessTeam(ChessTeam.WHITE)
        this.black = new ChessTeam(ChessTeam.BLACK)

        this.board = new ChessBoard()
    }
}


