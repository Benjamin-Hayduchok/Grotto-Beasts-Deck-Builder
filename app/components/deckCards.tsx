import React, { Component, useState } from 'react'
import DeckCard from './deckCard'
import eventBus from './eventBus';
import cardList from './card-list.json'


type Props = {}

type State = {}

var hack = true;
var currEpicName = ""

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
  var returnCard = {
    name: cardFromDict.name.toString(),
    imageName: "placeholder, MUST REPLACE LATER!",
    count: "1", // MUST GENERATE THIS LATER BY DETERMINING IF THE CARD EXISTS IN THE LIST YET
    cost: cardFromDict.cost.toString(),
    isEpic: checkEpic(cardFromDict.type)
  };
  
  return returnCard;
}

const isEpicUsed = (cardToAdd: {isEpic: boolean, name: string}) => {
  return cardToAdd.isEpic && currEpicName != "" && cardToAdd.name != currEpicName;
} 

var currDeckArr: { cost: string, name: string, imageName: string, count: string, isEpic: boolean }[] = [];
  // {cost: "0", name: "placeholder", imageName: "placeholder", count: "1", isEpic: true},
  // {cost: "1", name: "Demon Lord Zeraxos", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "2", name: "Maze of Many Ways", imageName: "placeholder", count: "1", isEpic: true},
  // {cost: "3", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "4", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "5", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "6", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "7", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},
  // {cost: "9", name: "placeholder", imageName: "placeholder", count: "1", isEpic: false},

// ];

console.log('currDeckArr', currDeckArr)
// currDeckArr.push({cost: "0", name: "placeholder", imageName: "placeholder", count: "1", isEpic: true})


export default function deckCards(props: any) {
  
  const [deckArr, setDeckArr] = useState(currDeckArr);
  if (hack) {
    hack = false
    eventBus.on("addCardToDeck", (data: any) => {
        var cardToAdd = getCardById(data.card.cardNum)
        if (!isEpicUsed(cardToAdd)) {
          var shouldBeAddedToDeck = true;
          for (var i = 0 ; i < deckArr.length; i++) {
            var cardFromDeck = deckArr[i];
            if (cardToAdd.name === cardFromDeck.name) { // matched card to add to full card info from Card DB
              if (parseInt(cardFromDeck.count) >= 3) {
                var shouldBeAddedToDeck = false;
                break;
              }
              deckArr[i].count = toStringInc(deckArr[i].count);
              shouldBeAddedToDeck = false;
              break;
            }
          }
          if (shouldBeAddedToDeck) deckArr.push(cardToAdd);
          if (cardToAdd.isEpic) currEpicName = cardToAdd.name;
          console.log('currEpicName', currEpicName)
        }
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