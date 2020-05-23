
export default class ChessPiece {
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
