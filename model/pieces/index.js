import Rook from './rook.js'
import King from './king.js'
import Pawn from './pawn.js'
import Queen from './queen.js'
import Bishop from './bishop.js'
import Knight from './knight.js'

import ChessPiece from './piece.js'

const PieceMap = {
  [ChessPiece.BLACK_PAWN]: Pawn, [ChessPiece.WHITE_PAWN]: Pawn,
  [ChessPiece.BLACK_KING]: King, [ChessPiece.WHITE_KING]: King,
  [ChessPiece.BLACK_ROOK]: Rook, [ChessPiece.WHITE_ROOK]: Rook,
  [ChessPiece.BLACK_QUEEN]: Queen, [ChessPiece.WHITE_QUEEN]: Queen,
  [ChessPiece.BLACK_KNIGHT]: Knight, [ChessPiece.WHITE_KNIGHT]: Knight,
  [ChessPiece.BLACK_BISHOP]: Bishop, [ChessPiece.WHITE_BISHOP]: Bishop,
}

export { ChessPiece, PieceMap }
