import React from 'react'
import Board from './Board.jsx'

import ChessGame from '../../chess'

export default function App() {
  return <Board game={new ChessGame({})} />
}