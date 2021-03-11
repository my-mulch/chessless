const NUM_RANKS = 8, NUM_FILES = 8

const ROOK_OPTION = 'Rook - 0'
const QUEEN_OPTION = 'Queen - 1'
const KNIGHT_OPTION = 'Knight - 2'
const BISHOP_OPTION = 'Bishop - 3'

export const coinFlip = () => Math.random() < Math.random()
export const randInt = (int) => Math.floor(Math.random() * int)

export const rankAndFileOf = function (index) {
    return [
        Math.floor(index / NUM_RANKS),
        index % NUM_FILES
    ]
}

export const indexOf = function (rank, file) {
    if (rank < 0 || rank >= NUM_RANKS || file < 0 || file >= NUM_FILES)
        return undefined

    return rank * NUM_RANKS + file
}

export const promotionPrompt = function () {
    return Number(prompt([
        ROOK_OPTION,
        QUEEN_OPTION,
        KNIGHT_OPTION,
        BISHOP_OPTION,
    ].join('\n')))
}
