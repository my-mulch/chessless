
export default class ChessMove {
    constructor(from, to, special) {
        this.to = to
        this.from = from
        this.special = special
    }

    static find(game, next, steps = Infinity) {
        let step = 0
        let to = next(game.turn.from)

        while (step++ < steps && !game.isOutOfBoundsSquare(to) && !game.isSameTeamSquare(to)) {
            game.considerMove(to)

            if (game.isOtherTeamSquare(to))
                return

            to = next(to)
        }
    }

    make(game) {
        game.board[this.to] = game.board[this.from]
        game.board[this.from] = null

        this.special && this.special(game)
    }

    resultsInCheck(game) {
        if (game.turn.seekingCheck)
            return false

        // Clone the game
        const newGame = game.clone()

        // Make the move
        this.make(newGame)

        // Did that move result in check?
        return newGame.kingIsInCheck()
    }
}
