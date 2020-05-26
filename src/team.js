import ChessPiece from './piece.js'

export default class ChessTeam extends Array {
    static BLACK = true
    static WHITE = false

    static PIECE_TYPES = { RK: 0, KN: 1, BI: 2, QN: 3, KG: 4, PN: 5 }

    constructor(team) {
        super(
            new ChessPiece(team, ChessTeam.PIECE_TYPES.RK),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.KN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.BI),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.QN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.KG),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.BI),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.KN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.RK),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN),
            new ChessPiece(team, ChessTeam.PIECE_TYPES.PN))

        this.moveFinder = [
            this.getRookMoves,
            this.getKnightMoves,
            this.getBishopMoves,
            this.getQueenMoves,
            this.getKingMoves,
            this.getPawnMoves
        ]
    }

    // Move types
    getRookMoves(board, rook) { }
    getKnightMoves(board, knight) { }
    getBishopMoves(board, bishop) { }
    getQueenMoves(board, queen) { }
    getKingMoves(board, king) { }
    getPawnMoves(board, pawn) { }

    getTeamMoves(board) {
        const moves = []

        for (const piece of this) {
            const findMoves = this.moveFinder[piece.type]
            moves.push(...findMoves(board, piece))
        }

        return moves
    }
}
