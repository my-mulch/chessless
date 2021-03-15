import React from 'react'
import Board from './Board.jsx'

import ChessGame from '../../model'

export default function App() {
  window.game = new ChessGame({})
  return <Board game={window.game} />
}