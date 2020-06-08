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
