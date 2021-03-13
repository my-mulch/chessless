import Rook from './rook.js'
import King from './king.js'
import Pawn from './pawn.js'
import Queen from './queen.js'
import Bishop from './bishop.js'
import Knight from './knight.js'

import ChessPiece from '../game/piece.js'

export default {
  [ChessPiece.PAWN]: Pawn,
  [ChessPiece.KING]: King,
  [ChessPiece.ROOK]: Rook,
  [ChessPiece.QUEEN]: Queen,
  [ChessPiece.KNIGHT]: Knight,
  [ChessPiece.BISHOP]: Bishop,
}
