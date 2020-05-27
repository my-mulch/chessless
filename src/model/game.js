import ChessTeam from './team.js'
import ChessBoard from './board.js'

export default class ChessGame {
    constructor() {
        this.white = new ChessTeam(ChessTeam.WHITE)
        this.black = new ChessTeam(ChessTeam.BLACK)
        
        this.board = new ChessBoard()
        
        this.white.setup(this.board)
        this.black.setup(this.board)
        
        this.turn = this.white
        this.history = []
    }
}


