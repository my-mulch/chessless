import ChessPiece from './piece.js'

export default class ChessTeam extends Array {
    static BLACK = true
    static WHITE = false

    static NUM_PIECES = 16
    static NEXT_PIECE = { [ChessTeam.BLACK]: -1, [ChessTeam.WHITE]: 1 }
    static STARTING_LOCATION = { [ChessTeam.BLACK]: 63, [ChessTeam.WHITE]: 0 }

    constructor(team) {
        const incr = ChessTeam.NEXT_PIECE[team]
        const base = ChessTeam.STARTING_LOCATION[team]
        const { RK, KN, BI, QN, KG, PN } = ChessPiece.PIECE_TYPES

        super(
            new ChessPiece(team, RK, base + incr * 0),
            new ChessPiece(team, KN, base + incr * 1),
            new ChessPiece(team, BI, base + incr * 2),
            new ChessPiece(team, QN, base + incr * 3),
            new ChessPiece(team, KG, base + incr * 4),
            new ChessPiece(team, BI, base + incr * 5),
            new ChessPiece(team, KN, base + incr * 6),
            new ChessPiece(team, RK, base + incr * 7),
            new ChessPiece(team, PN, base + incr * 8),
            new ChessPiece(team, PN, base + incr * 9),
            new ChessPiece(team, PN, base + incr * 10),
            new ChessPiece(team, PN, base + incr * 11),
            new ChessPiece(team, PN, base + incr * 12),
            new ChessPiece(team, PN, base + incr * 13),
            new ChessPiece(team, PN, base + incr * 14),
            new ChessPiece(team, PN, base + incr * 15))

        this.team = team

        this.moveFinder = [
            this.getRookMoves,
            this.getKnightMoves,
            this.getBishopMoves,
            this.getQueenMoves,
            this.getKingMoves,
            this.getPawnMoves
        ]
    }

    setup(board) {
        let i = 0
        while (i < ChessTeam.NUM_PIECES) {
            const piece = this[i++]
            const location = piece.location
            
            board[location].piece = piece
        }
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
