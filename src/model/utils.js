const MAX = 32
const GET = 'get'
const SET = 'set'
const COMMA = ','
const CREATE = 'create'
const UNPACK = 'unpack'
const NEW_LINE = '\n'
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

export const lowerCaseFirst = function (string) {
    return string[0].toLowerCase() + string.slice(1)
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

    const fields = Object.keys(mappings)

    _class[CREATE] = new Function(`{${fields.map(lowerCaseFirst)}}`, [ // eslint-disable-line
        `let value = 0`,
        ...fields.map(function (field) {
            return `value = this.${SET}${field}(value, ${lowerCaseFirst(field)})`
        }),
        `return value`
    ].join(NEW_LINE))

    _class[UNPACK] = new Function(`value`, [ // eslint-disable-line
        `return {`,
        fields.map(function (field) {
            return `${field.toLowerCase()}:this.${GET}${field}(value)`
        }).join(COMMA),
        `}`
    ].join(NEW_LINE))

    return _class
}
