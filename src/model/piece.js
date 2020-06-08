import { rankAndFileOf, indexOf } from './utils'

export default class ChessPiece {
    static TEAM_BIT = 1
    static TEAM_MASK = 254
    static TYPE_MASK = 241

    static RIGHT_STEP = 1
    static FORWARD_STEP = 8

    static FORWARD = 1
    static BACKWARD = -1

    static BLACK = 1
    static WHITE = 0

    static PAWN = 2
    static ROOK = 4
    static KNIGHT = 6
    static BISHOP = 8
    static QUEEN = 10
    static KING = 12

    static TEAMS = ['white', 'black']
    static NAMES = {
        [ChessPiece.PAWN]: 'pawn',
        [ChessPiece.ROOK]: 'rook',
        [ChessPiece.KNIGHT]: 'knight',
        [ChessPiece.BISHOP]: 'bishop',
        [ChessPiece.QUEEN]: 'queen',
        [ChessPiece.KING]: 'king'
    }

    static toString(piece) {
        const team = ChessPiece.getTeam(piece)
        const type = ChessPiece.getType(piece)

        return `${ChessPiece.TEAMS[team]}-${ChessPiece.NAMES[type]}`
    }

    static getType(piece) {
        return piece & ChessPiece.TEAM_MASK
    }

    static setType(piece, type) {
        return (piece & ChessPiece.TYPE_MASK) | type
    }

    static getTeam(piece) {
        return piece & ChessPiece.BLACK
    }

    static setTeam(piece, team) {
        return (piece & ChessPiece.TEAM_MASK) | team
    }

    static orient(piece) {
        return ChessPiece.getTeam(piece) === ChessPiece.BLACK
            ? ChessPiece.BACKWARD
            : ChessPiece.FORWARD
    }

    static forward(piece, from, distance = 1) {
        if (!from) return undefined

        const [rank, file] = rankAndFileOf(from)

        const newRank = rank + ChessPiece.orient(piece) * distance
        const newFile = file

        return indexOf(newRank, newFile)
    }

    static right(piece, from, distance = 1) {
        if (!from) return undefined

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
