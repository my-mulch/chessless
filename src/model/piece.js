import { rankAndFileOf, indexOf, numeric } from './utils'

export default numeric({ // data type is represented by an integer
    Id: [8, 4], // 4 bits
    Type: [4, 1], // 3 bits
    Team: [1, 0], // 1 bit
}, class ChessPiece {
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

        static moveForward(piece, from, distance = 1) {
            if (isNaN(from)) return undefined

            const [rank, file] = rankAndFileOf(from)

            const newRank = rank + ChessPiece.orient(piece) * distance
            const newFile = file

            return indexOf(newRank, newFile)
        }

        static moveRight(piece, from, distance = 1) {
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

        // Piece moves
        static moveLeft(piece, from, distance = 1) { return ChessPiece.moveRight(piece, from, distance * ChessPiece.BACKWARD) }
        static moveBackward(piece, from, distance = 1) { return ChessPiece.moveForward(piece, from, distance * ChessPiece.BACKWARD) }
        static moveForwardRight(piece, from, distance = 1) { return ChessPiece.moveForward(piece, ChessPiece.moveRight(piece, from, distance), distance) }
        static moveForwardLeft(piece, from, distance = 1) { return ChessPiece.moveForward(piece, ChessPiece.moveLeft(piece, from, distance), distance) }
        static moveBackwardLeft(piece, from, distance = 1) { return ChessPiece.moveBackward(piece, ChessPiece.moveLeft(piece, from, distance), distance) }
        static moveBackwardRight(piece, from, distance = 1) { return ChessPiece.moveBackward(piece, ChessPiece.moveRight(piece, from, distance), distance) }
    })
