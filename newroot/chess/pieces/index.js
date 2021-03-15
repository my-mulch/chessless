import Rook from './rook.js'
import King from './king.js'
import Pawn from './pawn.js'
import Queen from './queen.js'
import Bishop from './bishop.js'
import Knight from './knight.js'

import ChessPiece from '../game/piece.js'

// Piece Map for both black and white pieces
export default {
  [ChessPiece.PAWN]: Pawn, [ChessPiece.PAWN.toUpperCase()]: Pawn,
  [ChessPiece.KING]: King, [ChessPiece.KING.toUpperCase()]: King,
  [ChessPiece.ROOK]: Rook, [ChessPiece.ROOK.toUpperCase()]: Rook,
  [ChessPiece.QUEEN]: Queen, [ChessPiece.QUEEN.toUpperCase()]: Queen,
  [ChessPiece.KNIGHT]: Knight, [ChessPiece.KNIGHT.toUpperCase()]: Knight,
  [ChessPiece.BISHOP]: Bishop, [ChessPiece.BISHOP.toUpperCase()]: Bishop,
}
