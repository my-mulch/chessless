const MAX = 32
const GET = 'get'
const SET = 'set'
const NUM_RANKS = 8

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

export const getBitMask = function (from, to = 0) {
    return 2 ** from - 2 ** to
}

export const setBitMask = function (from, to = 0) {
    return getBitMask(MAX, from) | getBitMask(to)
}

export const getter = function (mask, bit, self) {
    return (self & mask) >> bit
}

export const setter = function (mask, bit, self, value) {
    return (self & mask) | (value << bit)
}

export const numeric = function (mappings, _class) {
    for (const [field, bits] of Object.entries(mappings)) {
        _class[`${GET}${field}`] = getter.bind(null, getBitMask(...bits), bits[1])
        _class[`${SET}${field}`] = setter.bind(null, setBitMask(...bits), bits[1])
    }

    return _class
}
