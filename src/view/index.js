import React from 'react'
import ChessGame from '../model/game'
import { indexOf } from '../model/utils'

import './index.css'

export default class ChessView extends React.Component {
    static RANK_TO_INDEX = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7 }
    static FILE_TO_INDEX = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 }

    constructor() {
        super()

        this.state = {
            game: new ChessGame(),
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            selected: null
        }

        window.game = this

        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
    }

    playRandomGame() {
        setInterval(() => this.playRandomMove(), 1)
    }

    playRandomMove() {
        const newGame = this.state.game.getMoves()

        const toPossibilities = Object.keys(newGame.turn.moves)
        const toRandomChoice = Math.floor(Math.random() * toPossibilities.length)
        const to = toPossibilities[toRandomChoice]

        if (!Object.keys(newGame.turn.moves).length) {
            alert('CHECKMATE')
            return false
        }

        const fromPossibilities = Object.keys(newGame.turn.moves[to])
        const fromRandomChoice = Math.floor(Math.random() * fromPossibilities.length)
        const from = fromPossibilities[fromRandomChoice]

        const promotePossibilities = newGame.turn.moves[to][from]
        const promoteRandomChoice = Math.floor(Math.random() * promotePossibilities.length)
        const promote = promotePossibilities[promoteRandomChoice]

        let game = newGame.makeMove(from, to, promote)


        this.setState({ game })

        return true
    }

    handleMouseUp(event, index) {
        event.preventDefault()

        let game = this.state.game.makeMove(this.state.selected, index)

        if (!game) {
            alert('CHECKMATE')
            game = new ChessGame()
        }

        this.setState({ game, selected: null })
    }

    handleMouseDown(event, index) {
        event.preventDefault()

        this.setState({ selected: index })
    }

    renderHeader() {
        return <tr>
            <th></th>
            {this.state.files.map(file => <th key={file}>{file}</th>)}
        </tr>
    }

    renderBoard() {
        return this.state.ranks.map((rank, ri) =>
            <tr key={ri}>
                <th>{rank}</th>
                {this.state.files.map((file) => this.renderSquare(rank, file))}
            </tr>
        )
    }

    renderSquare(rank, file) {
        const board = this.state.game.board

        const numRank = ChessView.RANK_TO_INDEX[rank]
        const numFile = ChessView.FILE_TO_INDEX[file]

        const key = indexOf(numRank, numFile)

        return <td
            key={key}
            onMouseUp={event => this.handleMouseUp(event, key)}
            onMouseDown={event => this.handleMouseDown(event, key)}
            className={board.describeSquare(numRank, numFile)}>
        </td>
    }

    render() {
        return <table
            className={this.state.game.board.constructor.name}>
            <tbody>
                {this.renderHeader()}
                {this.renderBoard()}
            </tbody>
        </table>
    }
}
