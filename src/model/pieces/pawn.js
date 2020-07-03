import ChessPiece from '../piece'

export default class Pawn {
    // Push
    static getPushes(game) {
        let to = ChessPiece.moveForward(game.turn.piece, game.turn.from)

        if (game.isEmptySquare(to))
            game.considerMove(to)

        to = ChessPiece.moveForward(game.turn.piece, to)

        if (game.isEmptySquare(to) && !game.history.moved.has(game.turn.piece))
            game.considerMove(to)
    }

    // Enpassant
    static canEnpassant(game, direction) {
        if (!game.history.moves.length)
            return false

        const to = direction(game.turn.piece, game.turn.from)
        const otherPiece = game.board[to]
        const lastMove = game.history.lastMove()

        return game.isOtherTeamSquare(to) &&
            ChessPiece.getType(otherPiece) === ChessPiece.PAWN &&
            Math.abs(lastMove.from - lastMove.to) === 16 && // Double push
            game.board[lastMove.to] === otherPiece
    }

    static getEnpassant(game, checkSquare, moveSquare) {
        if (Pawn.canEnpassant(game, checkSquare))
            game.considerMove(moveSquare(game.turn.piece, game.turn.from))
    }

    // Capture
    static getCapture(game, moveSquare) {
        const to = moveSquare(game.turn.piece, game.turn.from)

        if (game.isOtherTeamSquare(to))
            game.considerMove(to)
    }

    static getMoves(game) {
        Pawn.getEnpassant(game, ChessPiece.moveLeft, ChessPiece.moveForwardLeft)
        Pawn.getEnpassant(game, ChessPiece.moveRight, ChessPiece.moveForwardRight)

        Pawn.getCapture(game, ChessPiece.moveForwardLeft)
        Pawn.getCapture(game, ChessPiece.moveForwardRight)

        Pawn.getPushes(game)
    }
}
