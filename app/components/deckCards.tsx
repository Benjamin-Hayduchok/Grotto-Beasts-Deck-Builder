import React, { Component } from 'react'
import DeckCard from './deckCard'
import eventBus from './eventBus';


type Props = {}

type State = {}

var currDeckArr = [
  {cost: "0", name: "placeholder", imageName: "placeholder", count: "1", isEpic: true},
  {cost: "1", name: "Demon Lord Zeraxos", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "2", name: "Maze of Many Ways", imageName: "placeholder", count: "1", isEpic: true},
  {cost: "3", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "4", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "5", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "6", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  {cost: "7", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},

];

eventBus.on("couponApply", (data: any) =>
        {
            console.log("OMGGGGGG")
            console.log(data)
            currDeckArr.push({cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false})
            console.log('currDeckArr', currDeckArr)
        }
    );

export default class deckCards extends Component<Props, State> {
  state = {}

  render() {
    return (
      <div className='deckCards'  id="style-1">
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