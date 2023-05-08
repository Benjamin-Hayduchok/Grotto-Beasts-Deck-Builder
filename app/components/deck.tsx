import React, { Component } from 'react'
import DeckHeader from './deckHeader'
import DeckCards from './deckCards'

type Props = {}

type State = {}

export default class deck extends Component<Props, State> {
  state = {}

  render() {
    return (
        <div className="deck">
            <DeckHeader>
            </DeckHeader>
            <DeckCards>
            </DeckCards>
        </div>
    )
  }
}