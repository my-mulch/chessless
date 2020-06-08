import ChessTeam from './team'
import ChessBoard from './board'
import ChessPiece from './piece/'

import Pawn from './piece/pawn'
import Rook from './piece/rook'
import King from './piece/king'
import Queen from './piece/queen'
import Knight from './piece/knight'
import Bishop from './piece/bishop'

export default class ChessTurn {
    constructor(
        team = ChessPiece.WHITE,
        board = new ChessBoard([
            ...ChessTeam.init(ChessPiece.WHITE),
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            ...ChessTeam.init(ChessPiece.BLACK)
        ])
    ) {
        this.team = team
        this.board = board
        this.moves = this.getMoves()
    }

    getMoves() {
        const moves = []

        for (let index = 0; index < this.board.length; index++) {
            const piece = this.board[index]

            if (!piece)
                continue

            switch (ChessPiece.getType(piece)) {
                case ChessPiece.ROOK:
                    moves.push(...Rook.getMoves(game, piece, from))
                    continue

                case ChessPiece.KING:
                    moves.push(...King.getMoves(game, piece, from))
                    continue

                case ChessPiece.PAWN:
                    moves.push(...Pawn.getMoves(game, piece, from))
                    continue

                case ChessPiece.KNIGHT:
                    moves.push(...Knight.getMoves(game, piece, from))
                    continue

                case ChessPiece.BISHOP:
                    moves.push(...Bishop.getMoves(game, piece, from))
                    continue

                case ChessPiece.QUEEN:
                    moves.push(...Queen.getMoves(game, piece, from))
                    continue
            }
        }

        return new Uint32Array(moves)
    }

    makeMove(from, to) { }

    clone() {
        return new ChessTurn(this.team, this.board.slice())
    }
}
