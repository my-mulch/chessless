import React from 'react'
import ChessGame from '../model/game.js'

import './index.css'

export default class ChessView extends React.Component {
    constructor() {
        super()

        this.state = { game: new ChessGame() }
    }

    renderHeader() {
        return <tr>
            <th></th>
            <th>a</th>
            <th>b</th>
            <th>c</th>
            <th>d</th>
            <th>e</th>
            <th>f</th>
            <th>g</th>
            <th>h</th>
        </tr>
    }

    renderBoard() {
        const ranks = this.state.game.board.constructor.RANKS
        const files = this.state.game.board.constructor.FILES

        if (!this.state.game.turn.team)
            ranks.reverse()
    
        return ranks.map(function (rank) {
            return <tr key={rank}>
                <th>{rank + 1}</th>
                {files.map(function (file) {
                    return this.renderSquare(file, rank)
                }, this)}
            </tr>
        }, this)
    }

    renderSquare(file, rank) {
        return <td
            key={file}
            className={this.state.game.board.getSquare(file, rank).toString()}>
        </td>
    }

    render() {
        return <table className="chess-board">
            <tbody>
                {this.renderHeader()}
                {this.renderBoard()}
            </tbody>
        </table>
    }
}
