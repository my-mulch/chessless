import React, { useEffect, useState } from 'react'

import ChessGame from '../../model'
import { indexOf } from '../../model/utils.js'
import { imageFromPiece } from './utils.js'

export default function App() {
  const [game, setGame] = useState(new ChessGame({}))
  const [moves, setMoves] = useState([])
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

  const getSquareStyle = function (rank, file, piece, moves) {
    const backgroundColor = moves ? 'green' : ((rank + file) % 2 ? 'brown' : 'beige')

    return {
      flex: 1,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: imageFromPiece[piece],
      backgroundColor
    }
  }


  useEffect(async () => {
    const { moves } = game.getMoves()
    setMoves(moves)

    await new Promise(_ => setTimeout(_, 50));

    setGame(game.makeMove(moves[Math.floor(Math.random() * moves.length)]))
  }, [game])


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
              const { moves } = game.getMoves()

              const selectedMove = moves.filter(move => move.from === selected && move.to === to)

              setGame(game.makeMove(selectedMove[Math.floor(Math.random() * selectedMove.length)]))
            }}
          />
        )}
      </div>
    )}
  </div>
}