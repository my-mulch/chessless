import React, { useState } from 'react'

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

  const getSquareStyle = function (rank, file) {
    return {
      flex: 1,
      backgroundColor: (rank + file) % 2 ? 'brown' : 'beige'
    }
  }

  return <div style={boardStyle}>
    {ranks.map((rank, ri) =>
      <div style={rowStyle}>
        {files.map((file, fi) =>
          <div style={getSquareStyle(ri, fi)}>{file} - {rank}</div>
        )}
      </div>
    )}
  </div>
}