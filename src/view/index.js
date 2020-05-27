import React from 'react'
import ChessGame from '../model/game.js'

import './index.css'

export default class ChessView extends React.Component {
    constructor() {
        super()

        this.state = { game: new ChessGame() }
        console.log(this.state)
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

    render() {
        return <table className="chess-board">
            <tbody>
                {this.renderHeader()}
                {[0, 1, 2, 3, 4, 5, 6, 7].map(function (rank, i) {
                    return <tr>
                        <th>{rank}</th>

                        {[0, 1, 2, 3, 4, 5, 6, 7].map(function (file, j) {
                            const square = this.state.game.board.getSquare(rank, file)

                            return <td className={square.toString()}></td>
                        }, this)}
                    </tr>
                }, this)}
            </tbody>
        </table>
    }
}
