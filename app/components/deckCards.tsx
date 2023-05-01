import React, { Component } from 'react'
import DeckCard from './deckCard'

type Props = {}

type State = {}

const currDeckArr = [
  {cost: "0", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "1", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "2", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "3", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "4", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "5", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "6", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "7", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
];

export default class deckCards extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className='deckCards'>
          {currDeckArr.map(card => (
              <DeckCard 
                  name={card.name}
                  imageName={card.imageName}
                  count={card.count}
                  cost={card.cost}
                  isEpic={card.isEpic}
              />
          ))}
      </div>
    )
  }
}