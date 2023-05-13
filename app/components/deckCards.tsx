import React, { Component, useState } from 'react'
import DeckCard from './deckCard'
import eventBus from './eventBus';
import cardList from './card-list.json'


type Props = {}

type State = {}

var hack = true;

const checkEpic = (cardType: string) => {
  if (cardType[0] === "✦") return true;
  return false;
}

const toStringInc = (input: string) => {
  var toStringCount = parseInt(input);
  toStringCount++;
  return toStringCount.toString();
}

const getCardById = (id: string) =>{
  const cardListDict = cardList;
  var cardFromDict = cardListDict[id as keyof typeof cardListDict];

  console.log('cardFromDict :>> ', cardFromDict);
  // mutate card { cost: string; name: string; imageName: string; count: string; isEpic: boolean; }': cost, name, imageName, count, isEpic
  // name={card.name}
  // imageName={card.imageName}
  // count={card.count}
  // cost={card.cost}
  // isEpic={card.isEpic}
  var returnCard = {
    name: cardFromDict.name.toString(),
    imageName: "placeholder, MUST REPLACE LATER!",
    count: "1", // MUST GENERATE THIS LATER BY DETERMINING IF THE CARD EXISTS IN THE LIST YET
    cost: cardFromDict.cost.toString(),
    isEpic: checkEpic(cardFromDict.type)
  };
  
  return returnCard;
}

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
  console.log('deckArr INIT', deckArr)

  if (hack) {
    hack = false
    eventBus.on("addCardToDeck", (data: any) =>
      {
        console.log('data', data);;
        var cardToAdd = getCardById(data.card.cardNum)
        var isAddedToDeck = false;
        for (var i = 0 ; i < deckArr.length; i++) {
          var card = deckArr[i];
          console.log('card', card)
          if (cardToAdd.name === card.name) {
            isAddedToDeck = true;
            deckArr[i].count = toStringInc(deckArr[i].count);
            break;
          }
        }
        if (!isAddedToDeck) deckArr.push(cardToAdd);
        setDeckArr([...deckArr]);
        hack = true;
        console.log('deckArrUPDATE ', deckArr)
        eventBus.remove("addCardToDeck")
      }
    );  
  }

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