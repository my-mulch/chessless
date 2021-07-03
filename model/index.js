import { parseFEN, STARTING_FEN } from "./utils.js"
import { PieceMap, ChessPiece } from './pieces/index.js'

export default class ChessGame {
  constructor({ FEN = STARTING_FEN, game }) {
    if (game) this.copyConstructor(game)
    else this.fenConstructor(FEN)
  }

  fenConstructor(FEN) {
    const [board, turn] = parseFEN(FEN)

    // Whose turn is it?
    this.turn = turn

    // Record the history
    this.previousMoves = []
    this.previousBoards = []

    // Map the board of strings into a board of piece objects
    this.board = board.map((piece) => {
      if (!piece) return null

      // Grab the class from the PieceMap
      const Piece = PieceMap[piece]

      // Create the new piece for the appropriate team
      return new Piece(ChessPiece.getTeam(piece))
    })
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.board = game.board.slice()
    this.previousMoves = game.previousMoves.slice()
    this.previousBoards = game.previousBoards.slice()
  }

  hasMoved(piece) {
    return this.previousMoves.some(move => move.piece.id === piece.id)
  }

  getLastMove() {
    return this.previousMoves[this.previousMoves.length - 1]
  }

  getMoves(team = this.turn) {
    return this.board
      .map((piece, square) => piece && piece.getTeam() === team && piece.getMoves(this, square))
      .flat()
      .filter(Boolean)
      .flat()
  }

  switchTurns() {
    this.turn = this.turn === ChessPiece.WHITE ? ChessPiece.BLACK : ChessPiece.WHITE

    return this
  }

  makeMove(move) {
    const newGame = this.clone()

    // Save the state so we can undo the move
    newGame.previousMoves.push(move)
    newGame.previousBoards.push(this.board)

    // Move the piece on the new game board: from -> to and execute any specialities (castling, enpassant, etc)
    newGame.board[move.to] = newGame.board[move.from]
    newGame.board[move.from] = null
    move.special && move.special(newGame.board)

    return newGame
  }

  undoMove() {
    const newGame = game.clone()

    newGame.previousMoves.pop()
    newGame.previousBoards.pop()

    return newGame
  }

  movePutsKingInCheck(move) {
    const newGame = this.makeMove(move)

    let king = null
    let kingSquare = null

    newGame.board.forEach((piece, square) => {
      if (
        piece &&
        piece.getType() === ChessPiece.KING &&
        piece.getTeam() === this.turn
      )
        king = piece, kingSquare = square
    }, this)

    return king.isInCheck(newGame, kingSquare)
  }

  isEmpty(square) { return this.board[square] === null }
  isInBounds(square) { return this.board[square] !== undefined }
  isOutOfBounds(square) { return this.board[square] === undefined }
  isSameTeam(square, piece) { return this.board[square] && this.board[square].getTeam() === piece.getTeam() }
  isOtherTeam(square, piece) { return this.board[square] && this.board[square].getTeam() !== piece.getTeam() }

  clone() { return new ChessGame({ game: this }) }
}
