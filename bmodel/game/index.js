/* eslint-disable no-bitwise */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-expressions */

import ChessPiece from '../piece';
import { parseFEN } from './utils';
import { cardinals, diagonals, knights, queens } from '../moves/attacks';
import { bitBoardToString, printBitBoard } from '../moves/utils';

export default class ChessGame {
  // Constructors
  constructor({ FEN, game }) {
    game ? this.copyConstructor(game) : this.fenConstructor(FEN);
  }

  fenConstructor(FEN) {
    const [pieces, turn, castles] = parseFEN(FEN);

    this.turn = turn;
    this.pieces = pieces;
    this.castles = castles;
  }

  copyConstructor(game) {
    this.turn = game.turn;
    this.castles = game.castles;
    this.enpassant = game.enpassant;

    this.board = game.board.slice();
  }

  changeTurns() { this.turn = ChessPiece.getOtherTeamFEN(this.turn); return this; }

  getMoves() {
    const allMoves = [];

    const current = this.pieces[this.turn];
    const other = this.pieces[ChessPiece.getOtherTeamFEN(this.turn)];
    const pieces = [Object.values(current), Object.values(other)].flat(Infinity);

    const bishopMoves = current[ChessPiece.BISHOP].map((bishopPos) => (
      pieces.reduce((moves, piece) => moves ^ piece, diagonals[bishopPos])
      & diagonals[bishopPos]
      ^ diagonals[bishopPos]
    ));

    return allMoves;
  }

  clone() { return new ChessGame({ game: this }); }
}
