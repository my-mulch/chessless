import React, { useEffect, useState } from 'react'

import ChessGame from '../../bmodel/game'
import { indexOf } from '../../model/utils.js'
import { imageFromPiece } from './utils.js'

export default function App() {
  const [game, setGame] = useState(new ChessGame({}))
  const [selected, setSelected] = useState(null)

  window.game = game
  // useEffect(async () => {
  //   await new Promise(_ => setTimeout(_, 0));
  //   const moves = game.getMoves({})

  //   const newGame = moves[Math.floor(Math.random() * moves.length)]
  //     .make(game)
  //     .changeTurns()

  //   setGame(newGame)
  // }, [game])

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

  const getSquareStyle = function (rank, file, piece) {
    return {
      flex: 1,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: imageFromPiece[piece],
      backgroundColor: (rank + file) % 2 ? 'pink' : 'beige'
    }
  }

  return <div style={boardStyle}>
    {ranks.map((rank, ri) =>
      <div key={rank} style={rowStyle}>
        {files.map((file, fi) =>
          <div
            key={file}
            style={getSquareStyle(ri, fi, /* game.board[indexOf(ri, fi)] */)}
            onMouseDown={() => { setSelected(indexOf(ri, fi)) }}
            onMouseUp={() => {
              setSelected(null)

              const end = indexOf(ri, fi)
              const moves = game.getMoves({})

              const selectedMove = moves.filter(move => move.start === selected && move.end === end)

              const newGame = selectedMove[Math.floor(Math.random() * selectedMove.length)]
                .make(game)
                .changeTurns()

              setGame(newGame)
            }}
          />
        )}
      </div>
    )}
  </div>
}