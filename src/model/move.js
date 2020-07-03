
export default class ChessMove {
    constructor(from, to) {
        this.to = to
        this.from = from
    }

    static find(game, next, steps = Infinity) {
        let step = 0
        let to = next(game.turn.piece, game.turn.from)

        while (step++ < steps) {
            if (game.isOutOfBoundsSquare(to))
                return

            if (game.isEmptySquare(to) || game.isOtherTeamSquare(to))
                game.considerMove(to)

            to = next(game.turn.piece, game.turn.from)
        }
    }

    make(game) {
        game.board[to] = game.board[from]
        game.board[from] = 0
    }
}
