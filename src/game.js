
class ChessGame {
    constructor() {
        this.board = new ChessBoard()
        this.history = [this]
    }
}

class ChessBoard extends Uint8Array {
    static NUM_SQUARES = 64
    static FILES = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
    static RANKS = { ONE: 0, TWO: 1, THREE: 2, FOUR: 3, FIVE: 4, SIX: 5, SEVEN: 6, EIGHT: 7 }

    constructor() {
        super(NUM_SQUARES)

        const { WHITE, BLACK } = ChessPiece.TEAMS
        const { RK, KN, BI, QN, KG, PN } = ChessPiece.TYPES
        const { A, B, C, D, E, F, G, H } = ChessBoard.FILES
        const { ONE, TWO, SEVEN, EIGHT } = ChessBoard.RANKS

        this.setSquare(A, ONE, ChessPiece.initPiece(WHITE, RK))
        this.setSquare(B, ONE, ChessPiece.initPiece(WHITE, KN))
        this.setSquare(C, ONE, ChessPiece.initPiece(WHITE, BI))
        this.setSquare(D, ONE, ChessPiece.initPiece(WHITE, QN))
        this.setSquare(E, ONE, ChessPiece.initPiece(WHITE, KG))
        this.setSquare(F, ONE, ChessPiece.initPiece(WHITE, BI))
        this.setSquare(G, ONE, ChessPiece.initPiece(WHITE, KN))
        this.setSquare(H, ONE, ChessPiece.initPiece(WHITE, RK))
        this.setSquare(A, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(B, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(C, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(D, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(E, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(F, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(G, TWO, ChessPiece.initPiece(WHITE, PN))
        this.setSquare(H, TWO, ChessPiece.initPiece(WHITE, PN))

        this.setSquare(A, EIGHT, ChessPiece.initPiece(BLACK, RK))
        this.setSquare(B, EIGHT, ChessPiece.initPiece(BLACK, KN))
        this.setSquare(C, EIGHT, ChessPiece.initPiece(BLACK, BI))
        this.setSquare(D, EIGHT, ChessPiece.initPiece(BLACK, QN))
        this.setSquare(E, EIGHT, ChessPiece.initPiece(BLACK, KG))
        this.setSquare(F, EIGHT, ChessPiece.initPiece(BLACK, BI))
        this.setSquare(G, EIGHT, ChessPiece.initPiece(BLACK, KN))
        this.setSquare(H, EIGHT, ChessPiece.initPiece(BLACK, RK))
        this.setSquare(A, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(B, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(C, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(D, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(E, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(F, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(G, SEVEN, ChessPiece.initPiece(BLACK, PN))
        this.setSquare(H, SEVEN, ChessPiece.initPiece(BLACK, PN))
    }

    static indexOf(file, rank) {
        if (file < 0 || file > 9)
            throw 'You passed an invalid file'

        if (rank < 0 || rank > 9)
            throw 'You passed an invalid rank'

        return rank * 8 + file
    }

    setSquare(rank, file, piece) {
        const index = ChessBoard.indexOf(rank, file)

        this[index] = piece
    }

    getSquare(rank, file) {
        return this[ChessBoard.indexOf(rank, file)]
    }
}

class ChessPiece {
    static NUM_BITS = 8
    static MASK = 2 ** ChessPiece.NUM_BITS
    static TEAMS = { WHITE: false, BLACK: true }
    static TYPES = { RK: 0, KN: 1, BI: 2, QN: 3, KG: 4, PN: 5 }

    /**

      Each chess piece is an 8-bit integer with the following structure:
     
                            Team Alive  Type 
                            0    0      000  
    */


    static setBits(piece, value, bits) {
        if (start < 0)
            throw 'Start must be greater than 0'

        if (stop > 9)
            throw 'Stop must be less than 9'

        if (stop < start)
            throw 'Stop cannot be less than start'

        const setMask = value << start
        const clearMask = ChessPiece.MASK - bits.reduce(range, bit => range + 2 ** bit)

        return piece & clearMask | setMask
    }

    static initPiece(team, type) {
        let piece = 0

        piece = setTeam(piece, team)
        piece = setType(piece, type)
        piece = setAlive(piece, true)

        return piece
    }

    static setType(piece, type) {
        if (type < 0 || type > 5)
            return piece

        return ChessPiece.setBits(piece, type, [2, 1, 0])
    }

    static setAlive(piece, alive) {
        if (alive != 0 && alive != 1)
            throw 'You passed an invalid alive state'

        return ChessPiece.setBits(piece, alive, [3])
    }

    static setTeam(team) {
        if (team != 0 && team != 1)
            throw 'You passed an invalid team'

        return ChessPiece.setBits(piece, team, [4])
    }
}
