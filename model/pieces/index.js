import Rook from './rook'
import King from './king'
import Pawn from './pawn'
import Queen from './queen'
import Bishop from './bishop'
import Knight from './knight'

import ChessPiece from './piece'

const PieceMap = {
  [ChessPiece.BLACK_PAWN]: Pawn, [ChessPiece.WHITE_PAWN]: Pawn,
  [ChessPiece.BLACK_KING]: King, [ChessPiece.WHITE_KING]: King,
  [ChessPiece.BLACK_ROOK]: Rook, [ChessPiece.WHITE_ROOK]: Rook,
  [ChessPiece.BLACK_QUEEN]: Queen, [ChessPiece.WHITE_QUEEN]: Queen,
  [ChessPiece.BLACK_KNIGHT]: Knight, [ChessPiece.WHITE_KNIGHT]: Knight,
  [ChessPiece.BLACK_BISHOP]: Bishop, [ChessPiece.WHITE_BISHOP]: Bishop,
}

export { ChessPiece, PieceMap }
