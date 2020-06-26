import ChessMove from '../move'
import ChessPiece from '../piece'

export default class King {
    static getKingSideCastle(type, game, moves, level, from) {
        if (level)
            return

        const kingPosition = from
        const king = game.board[kingPosition]
        const kingPositionNew = ChessPiece.kingSide(king, kingPosition, 2)

        const rookPosition = ChessPiece.kingSide(king, kingPosition, 3)
        const rook = game.board[rookPosition]
        const rookPositionNew = ChessPiece.kingSide(king, kingPosition, 1)

        const kingIsInCheck = ChessMove.isCheck(game, kingPosition, level)

        const legalCastle = [
            new ChessMove(type, kingPosition, rookPositionNew),
            new ChessMove(type, kingPosition, kingPositionNew)
        ].every(function (move) {
            return ChessMove.isLegal(game, move, level) && game.board[move.to] === 0
        })

        const rookHasntMoved = !game.history.moved.has(rook)
        const kingHasntMoved = !game.history.moved.has(king)

        if (!kingIsInCheck && legalCastle && rookHasntMoved && kingHasntMoved) {
            moves.add(new ChessMove(type,
                kingPosition, kingPositionNew,
                rookPosition, rookPositionNew))
        }
    }

    static getMoves(game, moves, level, from) {
        ChessMove.find({
            type: ChessMove.CASTLE_KING_SIDE,
            game,
            moves,
            level,
            from,
            movement: ChessMove.noop,
            stepFn: ChessMove.noop,
            endFn: King.getKingSideCastle
        })

        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.left, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.right, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.forward, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.backward, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.forwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.forwardRight, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.backwardLeft, steps: 1 })
        ChessMove.find({ type: ChessMove.KING, game, moves, level, from, movement: ChessPiece.backwardRight, steps: 1 })
    }
}
