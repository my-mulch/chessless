import ChessPieces from '../pieces'

export default class ChessTeam extends Array {
    static BLACK = true
    static WHITE = false
    static NUM_PIECES = 16

    constructor(team) {
        super()

        this.team = team

        if (this.team === ChessTeam.WHITE) {
            this.push(...this.initPieces())
            this.push(...this.initPawns())
        } else {
            this.push(...this.initPawns())
            this.push(...this.initPieces())
        }
    }

    initPawns() {
        return [
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team),
            new ChessPieces.Pawn(this.team)]
    }

    initPieces() {
        return [
            new ChessPieces.Rook(this.team),
            new ChessPieces.Knight(this.team),
            new ChessPieces.Bishop(this.team),
            new ChessPieces.Queen(this.team),
            new ChessPieces.King(this.team),
            new ChessPieces.Bishop(this.team),
            new ChessPieces.Knight(this.team),
            new ChessPieces.Rook(this.team)
        ]
    }

    getMoves(board) {
        const moves = []

        for (const piece of this)
            moves.push(...piece.getMoves(board))

        return moves
    }
}
