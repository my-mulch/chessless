import ChessTeam from './team.js'
import ChessBoard from './board.js'

export default class ChessGame {
    constructor() {
        this.white = new ChessTeam(ChessTeam.WHITE)
        this.black = new ChessTeam(ChessTeam.BLACK)

        this.turn = this.white

        const [
            WRK1, WKN1, WBI1, WQN1, WKG1, WBI2, WKN2, WRK2,
            WPN1, WPN2, WPN3, WPN4, WPN5, WPN6, WPN7, WPN8
        ] = this.white

        const [
            BRK1, BKN1, BBI1, BQN1, BKG1, BBI2, BKN2, BRK2,
            BPN1, BPN2, BPN3, BPN4, BPN5, BPN6, BPN7, BPN8
        ] = this.black

        this.board = new ChessBoard([
            BRK1, BKN1, BBI1, BQN1, BKG1, BBI2, BKN2, BRK2,
            BPN1, BPN2, BPN3, BPN4, BPN5, BPN6, BPN7, BPN8,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            WPN1, WPN2, WPN3, WPN4, WPN5, WPN6, WPN7, WPN8,
            WRK1, WKN1, WBI1, WQN1, WKG1, WBI2, WKN2, WRK2,
        ])
    }
}
