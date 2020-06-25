
export default class ChessMoveList extends Object {
    add(move) {
        if (!this[move.to])
            this[move.to] = { [move.from]: move }
        else
            this[move.to][move.from] = move
    }

    get(from, to) {
        try { return this[to][from] } catch (_) { return null }
    }
}
