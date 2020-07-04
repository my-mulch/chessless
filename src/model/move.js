
export default class ChessMove {
    constructor(from, to, special) {
        this.to = to
        this.from = from
        this.special = special || (_ => _)
    }

    static find(game, next, steps = Infinity) {
        let step = 0
        let to = next(game.turn.piece, game.turn.from)

        while (step++ < steps &&
            !game.isOutOfBoundsSquare(to) &&
            (game.isEmptySquare(to) || game.isOtherTeamSquare(to))) {

            game.considerMove(to)
            to = next(game.turn.piece, to)
        }
    }

    make(game) {
        game.board[this.to] = game.board[this.from]
        game.board[this.from] = 0

        this.special(game)
    }
}
