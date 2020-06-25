import ChessMove from '../move'
import ChessPiece from '../piece'

export default class Pawn {
    // Double push checks
    static canDoublePush(game, from) {
        return !game.history.moved.has(game.board[from])
    }

    static doublePush(piece, from) {
        return ChessPiece.forward(piece, from, 2)
    }

    static getDoublePush(game, from) {
        ChessMove.find({
            type: ChessMove.PAWN_DOUBLE_PUSH,
            game,
            from,
            movement: Pawn.doublePush,
            steps: 1
        })
    }

    // Single push checks
    static getSinglePush(game, from) {
        ChessMove.find({
            type: ChessMove.PAWN_SINGLE_PUSH,
            game,
            from,
            movement: ChessPiece.forward,
            steps: 1,
            endFn: ChessMove.noop
        })
    }

    // Enpassant checks
    static canEnpassant(game, from, direction) {
        if (!game.history.moves.length)
            return false

        const piece = game.board[from]

        const otherSquare = direction(piece, from)
        const otherPiece = game.board[otherSquare]

        const isOtherTeam = ChessPiece.getTeam(otherPiece) !== game.team
        const otherIsPawn = ChessPiece.getType(otherPiece) === ChessPiece.PAWN
        const lastMoveDoublePush = game.history.lastMove().type === ChessMove.PAWN_DOUBLE_PUSH
        const lastMoveWasOtherPiece = game.board[game.history.lastMove().to] === otherPiece

        return isOtherTeam && otherIsPawn && lastMoveDoublePush && lastMoveWasOtherPiece
    }

    static captureEnpassant(direction) {
        return function (type, game, from, to) {
            const move = new ChessMove(type, from, to)

            move.fromSecondary = from
            move.toSecondary = direction(game.board[from], from)

            game.moves.add(move)
        }
    }

    static getEnpassant(game, from, movement, direction) {
        ChessMove.find({
            type: ChessMove.ENPASSANT,
            game,
            from,
            movement,
            steps: 1,
            stepFn: Pawn.captureEnpassant(direction),
            endFn: ChessMove.noop
        })
    }

    // Capture checks
    static getCaptures(game, from, movement) {
        ChessMove.find({
            type: ChessMove.PAWN_CAPTURE,
            game,
            from,
            movement,
            steps: 1,
            stepFn: ChessMove.noop,
        })
    }

    static getMoves(game, from) {
        // Double push
        if (Pawn.canDoublePush(game, from))
            Pawn.getDoublePush(game, from)

        // Enpassant left and right
        if (Pawn.canEnpassant(game, from, ChessPiece.left))
            Pawn.getEnpassant(game, from, ChessPiece.forwardLeft, ChessPiece.left)

        if (Pawn.canEnpassant(game, from, ChessPiece.right))
            Pawn.getEnpassant(game, from, ChessPiece.forwardRight, ChessPiece.right)

        // Single push
        Pawn.getSinglePush(game, from)

        // Captures
        Pawn.getCaptures(game, from, ChessPiece.forwardLeft)
        Pawn.getCaptures(game, from, ChessPiece.forwardRight)
    }
}
