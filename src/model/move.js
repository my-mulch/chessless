import ChessPiece from './piece'

export default class ChessMove {
    static PAWN_DOUBLE_PUSH = 1
    static PAWN_SINGLE_PUSH = 2
    static PAWN_CAPTURE = 3
    static ENPASSANT = 4
    static PROMOTION = 5
    static ROOK = 6
    static KNIGHT = 7
    static BISHOP = 8
    static QUEEN = 9
    static KING = 10
    static CASTLE = 11

    constructor(type, from, to, fromSecondary, toSecondary) {
        this.to = to
        this.from = from
        this.type = type
        this.toSecondary = toSecondary
        this.fromSecondary = fromSecondary
    }

    // Move finders
    static find({
        type, // the move type we are trying to find
        game, // the current game object
        from, // where we are moving from
        movement, // how the piece moves
        steps = Infinity, // how many steps we take in given direction
        stepFn = ChessMove.empty, // stepFn determines what to do while we travel outward from a piece
        endFn = ChessMove.capture, // endFn determines what to do when we arrive at a piece
    }) {
        let piece = game.board[from], to = movement(piece, from), s = 0

        while (s++ < steps && game.board[to] === 0) {
            stepFn(type, game, from, to)
            to = movement(piece, to)
        }

        endFn(type, game, from, to)
    }

    // Move makers
    helper(game, from, to) {
        game.board[to] = game.board[from]
        game.board[from] = 0
    }

    make(game) {
        this.helper(game, this.from, this.to)

        if (this.toSecondary && this.fromSecondary)
            this.helper(game, this.fromSecondary, this.toSecondary)
    }

    // Step and End Fns
    static noop() { }
    
    static empty(type, game, from, to) {
        game.moves.add(new ChessMove(type, from, to))
    }

    static capture(type, game, from, to) {
        const otherSquare = game.board[to]
        const otherPiece = ChessPiece.unpack(game.board[to])

        if (otherSquare && otherPiece.team !== game.team)
            game.moves.add(new ChessMove(type, from, to))
    }
}
