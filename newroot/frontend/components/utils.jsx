import blackBishop from '../assets/black_bishop.png'
import blackKing from '../assets/black_king.png'
import blackKnight from '../assets/black_knight.png'
import blackPawn from '../assets/black_pawn.png'
import blackQueen from '../assets/black_queen.png'
import blackRook from '../assets/black_rook.png'

import whiteBishop from '../assets/white_bishop.png'
import whiteKing from '../assets/white_king.png'
import whiteKnight from '../assets/white_knight.png'
import whitePawn from '../assets/white_pawn.png'
import whiteQueen from '../assets/white_queen.png'
import whiteRook from '../assets/white_rook.png'

export const imageFromPiece = {
  r: `url(${blackRook})`,
  n: `url(${blackKnight})`,
  b: `url(${blackBishop})`,
  q: `url(${blackQueen})`,
  k: `url(${blackKing})`,
  p: `url(${blackPawn})`,

  R: `url(${whiteRook})`,
  N: `url(${whiteKnight})`,
  B: `url(${whiteBishop})`,
  Q: `url(${whiteQueen})`,
  K: `url(${whiteKing})`,
  P: `url(${whitePawn})`,
}