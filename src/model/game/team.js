import Pawn from '../pieces/pawn'
import Rook from '../pieces/rook'
import King from '../pieces/king'
import Queen from '../pieces/queen'
import Knight from '../pieces/knight'
import Bishop from '../pieces/bishop'

import ChessPiece from '../pieces/piece'

export default class ChessTeam extends Array {
    static NUM_PIECES = 16

    constructor(name) {
        super()

        this.name = name

        if (this.name === ChessPiece.WHITE)
            this.push(...this.initPieces(), ...this.initPawns())
        else
            this.push(...this.initPawns(), ...this.initPieces())
    }

    initPawns() {
        return [
            new Pawn(this.name),
            new Pawn(this.name),
            new Pawn(this.name),
            new Pawn(this.name),
            new Pawn(this.name),
            new Pawn(this.name),
            new Pawn(this.name),
            new Pawn(this.name)]
    }

    initPieces() {
        return [
            new Rook(this.name),
            new Knight(this.name),
            new Bishop(this.name),
            new Queen(this.name),
            new King(this.name),
            new Bishop(this.name),
            new Knight(this.name),
            new Rook(this.name)]
    }

    getMoves(board) {
        const moves = []

        for (const piece of this)
            moves.push(...piece.getMoves(board))

        return moves
    }
}
