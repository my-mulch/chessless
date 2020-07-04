const NUM_RANKS = 8, NUM_FILES = 8

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
