
export default class ChessMove {
    constructor(from, to, special) {
        this.to = to
        this.from = from
        this.special = special
    }

    static find(game, next, steps = Infinity) {
        let step = 0
        let to = next(game.turn.from)

        while (step++ < steps && !game.isOutOfBoundsSquare(to) && (game.isEmptySquare(to) || game.isOtherTeamSquare(to))) {
            game.considerMove(to)
            to = next(to)
        }
    }

    make(game) {
        game.board[this.to] = game.board[this.from]
        game.board[this.from] = 0

        this.special && this.special(game)
    }
}
