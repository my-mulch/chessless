export const NUM_RANKS = 8

export const rankAndFileOf = function (index) {
    return [
        Math.floor(index / NUM_RANKS),
        index % NUM_RANKS
    ]
}

export const indexOf = function (rank, file) {
    if (rank < 0 || rank > 7 || file < 0 || file > 7)
        return undefined

    return rank * NUM_RANKS + file
}

export const bitMask = function (from, to = 0) {
    return 2 ** from - 2 ** to
}
