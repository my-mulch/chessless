import React from 'react'
import Board from './Board'

import ChessGame from '../../chess/game'

export default function App() {
  return <Board game={new ChessGame()}/>
}