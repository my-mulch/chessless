import ChessPiece from './piece'

export default class ChessTeam {
    static PIECE_ID = 0
    static NUM_PAWNS = 8

    static switch(team) {
        return Number(!team)
    }

    static init(team) {
        return team === ChessPiece.BLACK
            ? [...ChessTeam.initPawns(team), ...ChessTeam.initPieces(team)]
            : [...ChessTeam.initPieces(team), ...ChessTeam.initPawns(team)]
    }

    static initPawns(team) {
        return new Array(ChessTeam.NUM_PAWNS)
            .fill(ChessPiece.PAWN)
            .map(function (type) {
                return ChessPiece.create({ team, type, id: ChessTeam.PIECE_ID++ })
            })
    }

    static initPieces(team) {
        const { ROOK, KNIGHT, BISHOP, QUEEN, KING } = ChessPiece

        return [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK]
            .map(function (type) {
                return ChessPiece.create({ team, type, id: ChessTeam.PIECE_ID++ })
            })
    }
}
