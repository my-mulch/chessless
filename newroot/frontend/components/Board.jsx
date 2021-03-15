import React, { useState } from 'react'

import { indexOf } from '../../chess/utils.js'
import { imageFromPiece } from './utils.js'

export default function Board({ game }) {
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
      backgroundColor: (rank + file) % 2 ? 'brown' : 'beige',
    }
  }

  return <div style={boardStyle}>
    {ranks.map((rank, ri) =>
      <div key={rank} style={rowStyle}>
        {files.map((file, fi) =>
          <div key={file} style={getSquareStyle(ri, fi, game.board[indexOf(ri, fi)])} />
        )}
      </div>
    )}
  </div>
}