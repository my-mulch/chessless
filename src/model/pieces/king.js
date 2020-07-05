import ChessMove from '../move'
import ChessPiece from '../piece'

export default class King extends ChessPiece {
    castleKingSide(game) {
        if (this.game.history.has(this.id)) return

        // Abstract
        const rook = game.board[this.moveKingSide(game.turn.from, 3)]

        if (game.history.moved.has(rook.id)) return
        
    }

    getMoves(game) {
        ChessMove.find(game, this.moveLeft.bind(this), 1)
        ChessMove.find(game, this.moveRight.bind(this), 1)
        ChessMove.find(game, this.moveForward.bind(this), 1)
        ChessMove.find(game, this.moveBackward.bind(this), 1)
        ChessMove.find(game, this.moveForwardLeft.bind(this), 1)
        ChessMove.find(game, this.moveForwardRight.bind(this), 1)
        ChessMove.find(game, this.moveBackwardLeft.bind(this), 1)
        ChessMove.find(game, this.moveBackwardRight.bind(this), 1)
    }
}
