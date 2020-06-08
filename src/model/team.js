import ChessPiece from './piece/'

export default class ChessTeam {
    static NUM_PAWNS = 8

    static init(team) {
        return team === ChessPiece.BLACK
            ? [...ChessTeam.initPawns(team), ...ChessTeam.initPieces(team)]
            : [...ChessTeam.initPieces(team), ...ChessTeam.initPawns(team)]
    }

    static initPawns(team) {
        return new Array(ChessTeam.NUM_PAWNS)
            .fill(ChessPiece.PAWN)
            .map(function (piece) {
                return ChessPiece.setTeam(piece, team)
            })
    }

    static initPieces(team) {
        const { ROOK, KNIGHT, BISHOP, QUEEN, KING } = ChessPiece

        return [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK]
            .map(function (piece) {
                return ChessPiece.setTeam(piece, team)
            })
    }
}
