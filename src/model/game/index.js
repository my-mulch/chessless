import ChessTeam from './team'
import ChessBoard from '../board'
import ChessPiece from '../pieces/piece'

export default class ChessGame {
    constructor() {
        this.turn = ChessPiece.WHITE
        this.history = []

        this.board = new ChessBoard(
            ...ChessTeam.init(ChessPiece.WHITE),
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            ...ChessTeam.init(ChessPiece.BLACK),
        )
    }
}
