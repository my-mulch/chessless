export const NUM_RANKS = 8
export const NUM_FILES = 8
export const NUM_SQUARES = 8 * 8

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const parseFEN = function (FEN) {
  // Split FEN into constituent parts
  const [position, turn, castles, enPassant] = FEN.split(' ')

  // Create the board
  const board = new Array(NUM_SQUARES)

  // Fill up the board with pieces
  let i = 0
  for (const square of position.replace(/\//g, '')) {
    const containsPiece = isNaN(square)

    if (containsPiece) board[i] = square

    i += containsPiece ? 1 : +square
  }

  // Return the board and turn
  return [board, turn]
}

export const rankAndFileOf = function (index) {
  return [Math.floor(index / NUM_RANKS), index % NUM_FILES]
}

export const indexOf = function (rank, file) {
  if (rank < 0 || rank >= NUM_RANKS || file < 0 || file >= NUM_FILES) return undefined

  return rank * NUM_RANKS + file
}

export const isEmpty = function (board, square) { return board[square] === null }
export const isInBounds = function (board, square) { return board[square] !== undefined }
export const isOutOfBounds = function (board, square) { return board[square] === undefined }

export const getMoves = function (board, team, history) {
  const allMoves = {}
  const allChecks = false
  const allAttacks = new Set()

  board.forEach((piece, square) => {
    if (!piece || piece.getTeam() !== team) return
    
    const { moves, checks, attacks } = piece.getMoves(square, board, history)

    // Assign moves
    allMoves[square] = moves
    
    // Merge attacks
    attacks.forEach(allAttacks.add, allAttacks)

    // Do we check the king?
    allChecks = allChecks || checks
  })

  return { moves: allMoves, checks: allChecks, attacks: allAttacks }
}
