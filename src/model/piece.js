import { rankAndFileOf, indexOf } from './utils'

export default class ChessPiece {
    static TEAM_BIT = 0
    static GET_TEAM = 1
    static CLEAR_TEAM = 254

    static TYPE_BIT = 1
    static GET_TYPE = 14
    static CLEAR_TYPE = 241

    static ID_BIT = 4
    static GET_ID = 240
    static CLEAR_ID = 15

    static ID = 0

    static FORWARD = 1
    static BACKWARD = -1

    static BLACK = 1
    static WHITE = 0

    static PAWN = 1
    static ROOK = 2
    static KNIGHT = 3
    static BISHOP = 4
    static QUEEN = 5
    static KING = 6

    static TEAMS = ['white', 'black']
    static NAMES = {
        [ChessPiece.PAWN]: 'pawn',
        [ChessPiece.ROOK]: 'rook',
        [ChessPiece.KNIGHT]: 'knight',
        [ChessPiece.BISHOP]: 'bishop',
        [ChessPiece.QUEEN]: 'queen',
        [ChessPiece.KING]: 'king'
    }

    static create(team, type) {
        let piece = 0

        piece = ChessPiece.setTeam(piece, team)
        piece = ChessPiece.setType(piece, type)
        piece = ChessPiece.setId(piece, ChessPiece.ID++)

        return piece
    }

    static toString(piece) {
        const team = ChessPiece.getTeam(piece)
        const type = ChessPiece.getType(piece)

        return `${ChessPiece.TEAMS[team]}-${ChessPiece.NAMES[type]}`
    }

    static getId(piece) { return (piece & ChessPiece.GET_ID) >> ChessPiece.ID_BIT }
    static setId(piece, id) { return (piece & ChessPiece.CLEAR_ID) | (id << ChessPiece.ID_BIT) }

    static getType(piece) { return (piece & ChessPiece.GET_TYPE) >> ChessPiece.TYPE_BIT }
    static setType(piece, type) { return (piece & ChessPiece.CLEAR_TYPE) | (type << ChessPiece.TYPE_BIT) }

    static getTeam(piece) { return piece & ChessPiece.GET_TEAM }
    static setTeam(piece, team) { return (piece & ChessPiece.CLEAR_TEAM) | team }

    static orient(piece) {
        return ChessPiece.getTeam(piece) === ChessPiece.BLACK
            ? ChessPiece.BACKWARD
            : ChessPiece.FORWARD
    }

    static forward(piece, from, distance = 1) {
        if (isNaN(from)) return undefined

        const [rank, file] = rankAndFileOf(from)

        const newRank = rank + ChessPiece.orient(piece) * distance
        const newFile = file

        return indexOf(newRank, newFile)
    }

    static right(piece, from, distance = 1) {
        if (isNaN(from)) return undefined

        const [rank, file] = rankAndFileOf(from)

        const newRank = rank
        const newFile = file + ChessPiece.orient(piece) * distance

        return indexOf(newRank, newFile)
    }

    static backward(piece, from, distance = 1) {
        return ChessPiece.forward(piece, from, distance * ChessPiece.BACKWARD)
    }

    static left(piece, from, distance = 1) {
        return ChessPiece.right(piece, from, distance * ChessPiece.BACKWARD)
    }

    static forwardRight(piece, from, distance = 1) {
        return ChessPiece.forward(piece, ChessPiece.right(piece, from, distance), distance)
    }

    static forwardLeft(piece, from, distance = 1) {
        return ChessPiece.forward(piece, ChessPiece.left(piece, from, distance), distance)
    }

    static backwardLeft(piece, from, distance = 1) {
        return ChessPiece.backward(piece, ChessPiece.left(piece, from, distance), distance)
    }

    static backwardRight(piece, from, distance = 1) {
        return ChessPiece.backward(piece, ChessPiece.right(piece, from, distance), distance)
    }
}
