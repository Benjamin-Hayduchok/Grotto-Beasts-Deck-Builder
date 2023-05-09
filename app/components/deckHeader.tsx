import React, { Component } from 'react'
import DeckCounter from './deckCounter'

type Props = {}

type State = {}

export default class deckHeader extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className="deckHeader">
        <DeckCounter></DeckCounter>
      </div>
    )
  }
}