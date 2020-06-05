import React from 'react'
import ChessGame from '../model/game'

import './index.css'

export default class ChessView extends React.Component {
    static SQUARE_COLORS = ['dark', 'light']

    constructor() {
        super()

        this.state = {
            game: new ChessGame(),
            ranks: [8, 7, 6, 5, 4, 3, 2, 1],
            files: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
            selected: null
        }

        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
    }

    handleMouseUp(_, index) { }
    handleMouseDown(_, index) { }

    renderHeader() {
        return <tr>
            <th></th>
            {this.state.files.map(file =>
                <th key={file}>{file}</th>)}
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

        const key = board.constructor.indexOf(rank, file)
        const rankNum = board.constructor.RANK_TO_INDEX[rank]
        const fileNum = board.constructor.FILE_TO_INDEX[file]

        const color = ChessView.SQUARE_COLORS[(rankNum + fileNum) % 2]

        return <td
            key={key}
            onMouseUp={event => this.handleMouseUp(event, key)}
            onMouseDown={event => this.handleMouseDown(event, key)}
            className={[board.getSquare(rank, file), color].join(' ')}>
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
