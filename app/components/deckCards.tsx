import React, { Component, useState } from 'react'
import DeckCard from './deckCard'
import eventBus from './eventBus';
import cardList from './card-list.json'
import util from './util'


type Props = {}

type State = {}

var hack = true;
var currEpicName = ""

const checkEpic = (cardType: string) => {
  if (cardType[0] === "✦") return true;
  return false;
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

console.log('currDeckArr', currDeckArr)

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
              deckArr[i].count = util.toStringInc(deckArr[i].count);
              eventBus.dispatch("incrementDeckCounter", cardToAdd);
              shouldBeAddedToDeck = false;
              break;
            }
          }
          if (shouldBeAddedToDeck) {
            deckArr.push(cardToAdd);
            eventBus.dispatch("incrementDeckCounter", cardToAdd);
          }
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