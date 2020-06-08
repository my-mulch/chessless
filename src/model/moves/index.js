import Pawn from './pawn'
import Rook from './rook'
import Knight from './knight'
import Bishop from './bishop'
import Queen from './queen'
import King from './king'

import ChessPiece from '../piece'

export default {
    [ChessPiece.PAWN]: Pawn,
    [ChessPiece.ROOK]: Rook,
    [ChessPiece.KNIGHT]: Knight,
    [ChessPiece.BISHOP]: Bishop,
    [ChessPiece.QUEEN]: Queen,
    [ChessPiece.KING]: King
}

