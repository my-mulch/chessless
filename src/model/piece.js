import { rankAndFileOf, indexOf, numeric } from './utils'

export default numeric({ // data type is represented by an integer
    Team: [1, 0], // 1 bit
    Type: [4, 1], // 3 bits
    Id: [8, 4], // 4 bits
}, class ChessPiece {
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
            [this.PAWN]: 'pawn',
            [this.ROOK]: 'rook',
            [this.KNIGHT]: 'knight',
            [this.BISHOP]: 'bishop',
            [this.QUEEN]: 'queen',
            [this.KING]: 'king'
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

        static queenSide(piece, from, distance = 1) {
            const team = ChessPiece.getTeam(piece)

            return team === ChessPiece.WHITE
                ? ChessPiece.left(piece, from, distance)
                : ChessPiece.right(piece, from, distance)
        }

        static kingSide(piece, from, distance = 1) {
            const team = ChessPiece.getTeam(piece)

            return team === ChessPiece.WHITE
                ? ChessPiece.right(piece, from, distance)
                : ChessPiece.left(piece, from, distance)
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
    })
