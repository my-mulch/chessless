import ChessPiece from './piece.js'

export default class ChessTeam extends Array {
    static BLACK = true
    static WHITE = false

    static NUM_PIECES = 16

    constructor(team) {
        const { RK, KN, BI, QN, KG, PN } = ChessPiece.PIECE_TYPES

        super(
            new ChessPiece(team, RK),
            new ChessPiece(team, KN),
            new ChessPiece(team, BI),
            new ChessPiece(team, QN),
            new ChessPiece(team, KG),
            new ChessPiece(team, BI),
            new ChessPiece(team, KN),
            new ChessPiece(team, RK),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN),
            new ChessPiece(team, PN))

        this.team = team
    }

    // Move types
    getRookMoves(board, rook) { }
    getKnightMoves(board, knight) { }
    getBishopMoves(board, bishop) { }
    getQueenMoves(board, queen) { }
    getKingMoves(board, king) { }
    getPawnMoves(board, pawn) { }

    getTeamMoves(board) { }
}
