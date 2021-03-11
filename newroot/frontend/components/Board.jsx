import React, { useState } from 'react'
import { imageFromPiece } from './utils'


export default function Board() {
  const [ranks] = useState([8, 7, 6, 5, 4, 3, 2, 1])
  const [files] = useState(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])

  const boardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '40vw',
    width: '40vw',
  }

  const rowStyle = {
    display: 'flex',
    flex: 1,
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
          <div key={file} style={getSquareStyle(ri, fi, 'N')}>{file} - {rank}</div>
        )}
      </div>
    )}
  </div>
}