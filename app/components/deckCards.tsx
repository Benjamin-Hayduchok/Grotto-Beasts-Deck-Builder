import React, { Component, useState } from 'react'
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

export default function deckCards(props: any) {
  
  const [deckArr, setDeckArr] = useState(currDeckArr);
  console.log('deckArr', deckArr)

  eventBus.on("addCardToDeck", (data: any) =>
        {
          var deckCopy = deckArr;
          deckCopy.push(data.card);
          setDeckArr([...deckCopy]);
        }
    );

    return (
      <div className='deckCards'  id="style-1">
          {deckArr.map(card => (
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