import React, { useState } from 'react'

import ChessGame from '../../model'
import { indexOf } from '../../model/utils.js'
import { imageFromPiece } from './utils.js'

export default function App() {
  const [game, setGame] = useState(new ChessGame({}))
  const [selected, setSelected] = useState(null)

  window.game = game

  const [ranks] = useState([8, 7, 6, 5, 4, 3, 2, 1])
  const [files] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

  const boardStyle = {
    height: '100vh',
    width: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }

  const rowStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  }

  const getSquareStyle = function (rank, file, piece, attacked) {
    const backgroundColor = attacked ? 'green' : ((rank + file) % 2 ? 'brown' : 'beige')
    
    return {
      flex: 1,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: imageFromPiece[piece],
      backgroundColor
    }
  }

  const { moves } = game.getMoves()

  return <div style={boardStyle}>
    {ranks.map((rank, ri) =>
      <div key={rank} style={rowStyle}>
        {files.map((file, fi) =>
          <div
            key={file}
            style={getSquareStyle(
              ri,
              fi,
              game.board[indexOf(ri, fi)],
              moves.filter(move => move.to === indexOf(ri, fi)).pop()
            )}
            onMouseDown={() => { setSelected(indexOf(ri, fi)) }}
            onMouseUp={() => {
              setSelected(null)
              const to = indexOf(ri, fi)
              const move = game.getMoves().moves.filter(move => move.from === selected && move.to === to).pop()

              console.log(move)
              if (move) setGame(game.makeMove(move))
            }}
          />
        )}
      </div>
    )}
  </div>
}