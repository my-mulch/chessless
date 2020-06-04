import React from 'react'
import ChessGame from '../model/game'

import './index.css'

export default class ChessView extends React.Component {
    constructor() {
        super()

        this.state = { game: new ChessGame() }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event) {

    }

    renderHeader() {
        const board = this.state.game.board

        return <tr>
            <th></th>
            {board.files.map((file, fi) =>
                <th key={fi}>{file}</th>
            )}
        </tr>
    }

    renderBoard() {
        const board = this.state.game.board

        return board.ranks.map((rank, ri) =>
            <tr key={ri}>
                <th>{rank}</th>
                {board.files.map((file) => this.renderSquare(rank, file))}
            </tr>
        )
    }

    renderSquare(rank, file) {
        const board = this.state.game.board
        const key = board.constructor.indexOf(rank, file)

        return <td key={key}
            className={board.getSquare(rank, file)}>
        </td>
    }

    render() {
        if (!this.state.game.turn)
            this.state.game.board.flip()

        return <table className={this.state.game.board.constructor.name}>
            <tbody>
                {this.renderHeader()}
                {this.renderBoard()}
            </tbody>
        </table>
    }
}
