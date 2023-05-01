import React, { Component } from 'react'
import DeckCard from './deckCard'

type Props = {}

type State = {}

export default class deckCards extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className='deckCards'>
        <DeckCard>

        </DeckCard>
      </div>
    )
  }
}