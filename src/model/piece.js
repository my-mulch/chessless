import { rankAndFileOf, indexOf } from './utils'

export default class ChessPiece {
    static FORWARD = 1
    static BACKWARD = -1

    static RANK = 0
    static FILE = 1

    static BLACK = 'Black'
    static WHITE = 'White'

    static TEAMS = [ChessPiece.WHITE, ChessPiece.BLACK]

    constructor(team) {
        this.team = ChessPiece.TEAMS[Number(team)]
    }

    toString() {
        return `${this.team}-${this.constructor.name}`
    }

    orient() {
        return this.team === ChessPiece.BLACK ? ChessPiece.BACKWARD : ChessPiece.FORWARD
    }

    move(from, direction, distance = 1) {
        if (isNaN(from)) return undefined

        const position = rankAndFileOf(from)

        position[direction] += this.orient() * distance

        return indexOf(...position)
    }

    // Piece moves
    moveLeft(from, distance = 1) { return this.moveRight(from, distance * ChessPiece.BACKWARD) }
    moveRight(from, distance = 1) { return this.move(from, ChessPiece.FILE, distance) }
    moveForward(from, distance = 1) { return this.move(from, ChessPiece.RANK, distance) }
    moveBackward(from, distance = 1) { return this.moveForward(from, distance * ChessPiece.BACKWARD) }
    moveForwardRight(from, distance = 1) { return this.moveForward(this.moveRight(from, distance), distance) }
    moveForwardLeft(from, distance = 1) { return this.moveForward(this.moveLeft(from, distance), distance) }
    moveBackwardLeft(from, distance = 1) { return this.moveBackward(this.moveLeft(from, distance), distance) }
    moveBackwardRight(from, distance = 1) { return this.moveBackward(this.moveRight(from, distance), distance) }
    moveKingSide(from, distance = 1) { return this.move(from, ChessPiece.FILE, this.orient() * distance * ChessPiece.FORWARD) }
    moveQueenSide(from, distance = 1) { return this.move(from, ChessPiece.FILE, this.orient() * distance * ChessPiece.BACKWARD) }
}
