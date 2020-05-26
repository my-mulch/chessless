import ChessTeam from './team.js'
import ChessBoard from './board.js'

export default class ChessGame {
    constructor() {
        this.turn = ChessTeam.WHITE

        this.white = new ChessTeam(ChessTeam.WHITE)
        this.black = new ChessTeam(ChessTeam.BLACK)

        this.board = new ChessBoard()

        const { A, B, C, D, E, F, G, H } = ChessBoard.FILES
        const { ONE, TWO, SEVEN, EIGHT } = ChessBoard.RANKS

        this.board.setSquare(this.white[0].setLocation(A, ONE))
        this.board.setSquare(this.white[1].setLocation(B, ONE))
        this.board.setSquare(this.white[2].setLocation(C, ONE))
        this.board.setSquare(this.white[3].setLocation(D, ONE))
        this.board.setSquare(this.white[4].setLocation(E, ONE))
        this.board.setSquare(this.white[5].setLocation(F, ONE))
        this.board.setSquare(this.white[6].setLocation(G, ONE))
        this.board.setSquare(this.white[7].setLocation(H, ONE))
        this.board.setSquare(this.white[8].setLocation(A, TWO))
        this.board.setSquare(this.white[9].setLocation(B, TWO))
        this.board.setSquare(this.white[10].setLocation(C, TWO))
        this.board.setSquare(this.white[11].setLocation(D, TWO))
        this.board.setSquare(this.white[12].setLocation(E, TWO))
        this.board.setSquare(this.white[13].setLocation(F, TWO))
        this.board.setSquare(this.white[14].setLocation(G, TWO))
        this.board.setSquare(this.white[15].setLocation(H, TWO))

        this.board.setSquare(this.black[0].setLocation(A, EIGHT))
        this.board.setSquare(this.black[1].setLocation(B, EIGHT))
        this.board.setSquare(this.black[2].setLocation(C, EIGHT))
        this.board.setSquare(this.black[3].setLocation(D, EIGHT))
        this.board.setSquare(this.black[4].setLocation(E, EIGHT))
        this.board.setSquare(this.black[5].setLocation(F, EIGHT))
        this.board.setSquare(this.black[6].setLocation(G, EIGHT))
        this.board.setSquare(this.black[7].setLocation(H, EIGHT))
        this.board.setSquare(this.black[8].setLocation(A, SEVEN))
        this.board.setSquare(this.black[9].setLocation(B, SEVEN))
        this.board.setSquare(this.black[10].setLocation(C, SEVEN))
        this.board.setSquare(this.black[11].setLocation(D, SEVEN))
        this.board.setSquare(this.black[12].setLocation(E, SEVEN))
        this.board.setSquare(this.black[13].setLocation(F, SEVEN))
        this.board.setSquare(this.black[14].setLocation(G, SEVEN))
        this.board.setSquare(this.black[15].setLocation(H, SEVEN))
    }
}


