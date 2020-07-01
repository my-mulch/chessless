import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Pawn {
    static moveFinder(type, game, moves, isAttacking, from) {
        return ChessMove.find.bind(
            null, // context
            type, // move type
            game, // game
            moves, // moveslist
            isAttacking, // movestyle
            from // from position
        )
    }

    // Double push checks
    static canDoublePush(game, from) {
        return !game.history.moved.has(game.board[from])
    }

    static moveDoublePush(piece, from) {
        return ChessPiece.forward(piece, from, 2)
    }

    // Enpassant checks
    static canEnpassant(game, from, direction) {
        if (!game.history.moves.length)
            return false

        const piece = game.board[from]
        const otherSquare = direction(piece, from)
        const otherPiece = game.board[otherSquare]

        return ChessPiece.getTeam(otherPiece) !== game.team &&
            ChessPiece.getType(otherPiece) === ChessPiece.PAWN &&
            game.history.lastMove().type === ChessMove.PAWN_DOUBLE_PUSH &&
            game.board[game.history.lastMove().to] === otherPiece
    }

    static captureEnpassant(direction) {
        return function (type, game, moves, isAttacking, from, to) {
            if (!Pawn.canEnpassant(game, from, direction))
                return

            const move = new ChessMove(type, from, to)

            move.fromSecondary = from
            move.toSecondary = direction(game.board[from], from)

            if (ChessMove.isLegal(game, move, isAttacking))
                moves.add(move)
        }
    }

    static getPushes(...state) {
        const findPushes = Pawn.moveFinder(ChessMove.PAWN_PUSH, ...state)

        findPushes(null, ChessPiece.moveForward, 2, Pawn.pushMoves)
    }

    static getCaptures(...state) {
        const findCaptures = Pawn.moveFinder(ChessMove.PAWN_CAPTURE, ...state)

        findCaptures(ChessPiece.forwardLeft, 1)
        findCaptures(ChessPiece.forwardRight, 1)
    }

    static getEnpassants(...state) {
        const findEnpassants = Pawn.moveFinder(ChessMove.PAWN_CAPTURE, ...state)

        findEnpassants(ChessPiece.forwardLeft, 1, Pawn.captureEnpassant(ChessPiece.left))
        findEnpassants(ChessPiece.forwardRight, 1, Pawn.captureEnpassant(ChessPiece.right))
    }

    // game, moves, isAttacking, from
    static getMoves(...state) {
        Pawn.getPushes(...state)
        Pawn.getCaptures(...state)
        Pawn.getEnpassants(...state)
    }
}
