const teams = { WHITE: false, BLACK: true }
const types = { RK: 0, KN: 1, BI: 2, QN: 3, KG: 4, PN: 5 }
const files = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7 }
const ranks = { ONE: 0, TWO: 1, THREE: 2, FOUR: 3, FIVE: 4, SIX: 5, SEVEN: 6, EIGHT: 7, NINE: 8 }

// Piece functions
function setLoc(file, rank) {
    if (file < 0 || file > 9)
        throw 'You passed an invalid file'

    if (rank < 0 || rank > 9)
        throw 'You passed an invalid rank'

    return rank * 8 + file
}

function setType(type) {
    if (type < 0 || type > 5)
        throw 'You passed an invalid type'

    return type << 6
}

function setTeam(team) {
    if (team != 0 && team != 1)
        throw 'You passed an invalid team'

    return team << 10
}

function setAlive(alive) {
    if (alive != 0 && alive != 1)
        throw 'You passed an invalid alive state'

    return alive << 9
}

// Team Alive  Type   Loc
// 0    0      000    000000

const white = new Uint16Array([
    setTeam(teams.WHITE) | setAlive(true) | setType(types.RK) | setLoc(files.A, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.KN) | setLoc(files.B, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.BI) | setLoc(files.C, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.QN) | setLoc(files.D, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.KG) | setLoc(files.E, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.BI) | setLoc(files.F, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.KN) | setLoc(files.G, ranks.ONE),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.RK) | setLoc(files.H, ranks.ONE),

    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.A, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.B, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.C, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.D, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.E, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.F, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.G, ranks.TWO),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.H, ranks.TWO),
])

const black = new Uint16Array([
    setTeam(teams.WHITE) | setAlive(true) | setType(types.RK) | setLoc(files.A, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.KN) | setLoc(files.B, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.BI) | setLoc(files.C, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.QN) | setLoc(files.D, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.KG) | setLoc(files.E, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.BI) | setLoc(files.F, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.KN) | setLoc(files.G, ranks.EIGHT),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.RK) | setLoc(files.H, ranks.EIGHT),

    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.A, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.B, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.C, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.D, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.E, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.F, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.G, ranks.SEVEN),
    setTeam(teams.WHITE) | setAlive(true) | setType(types.PN) | setLoc(files.H, ranks.SEVEN),
])
