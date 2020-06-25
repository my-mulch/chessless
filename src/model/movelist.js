
export default class ChessMoveList extends Object {
    add(move) {
        if (!this[move.from])
            this[move.from] = { [move.to]: move }
        else
            this[move.from][move.to] = move
    }

    get(from, to) {
        try { return this[from][to] } catch (_) { return null }
    }
}
