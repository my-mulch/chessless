import PieceMap from '../pieces'
import ChessPiece from './piece.js'
import { parseFEN, STARTING_FEN } from "../utils.js"

export default class ChessGame {
  static createPieces(piece) {
    if (!piece) return null

    // What type of piece is it? Grab the associated class from the PieceMap.
    const Piece = PieceMap[piece]

    // Create the new piece for the appropriate team
    return new Piece(ChessPiece.getTeam(piece))
  }

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

    // Convert the board of strings to board of piece objects
    this.board = board.map(ChessGame.createPieces)
  }

  copyConstructor(game) {
    this.turn = game.turn
    this.board = game.board.map(ChessGame.createPieces)
    this.previousMoves = game.previousMoves
    this.previousBoards = game.previousBoards
    this.previouslyMovedPieces = game.previouslyMovedPieces
  }

  hasMoved(piece) {
    return this.previousMoves.some(move => move.piece.id === piece.id)
  }

  getLastMove() {
    return this.previousMoves[this.previousMoves.length]
  }

  getMoves(team, seekingCheck = false) {
    const allMoves = []
    const allChecks = false
    const allAttacks = new Set()

    this.board.forEach((piece, square) => {
      if (!piece || piece.getTeam() !== team) return

      const { moves, checks, attacks } = piece.getMoves(this, square, seekingCheck)

      // Assign moves
      allMoves.push(...moves)

      // Merge attacks
      attacks.forEach(allAttacks.add, allAttacks)

      // Do we check the king?
      allChecks = allChecks || checks
    })

    return { moves: allMoves, checks: allChecks, attacks: allAttacks }
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
    // Make the move (returns new game), get the moves for that game with the attacking team, return if check is found
    return this.makeMove(move).getMoves(move.piece.getOtherTeam(), true).checks
  }

  isEmpty(square) { return this.board[square] === null }
  isInBounds(square) { return this.board[square] !== undefined }
  isOutOfBounds(square) { return this.board[square] === undefined }
  isSameTeam(square, piece) { return this.board[square] && this.board[square].getTeam() === piece.getTeam() }
  isOtherTeam(square, piece) { return this.board[square] && this.board[square].getTeam() !== piece.getTeam() }

  clone() {
    return new ChessGame(this)
  }
}
