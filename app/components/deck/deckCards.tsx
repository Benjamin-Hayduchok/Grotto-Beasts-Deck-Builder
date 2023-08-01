import React, { useState, useContext, useEffect } from "react";
import DeckCard from "./deckCard";
import eventBus from "../eventBus";
import cardList from "../card-list.json";
import util from "../util";
import Swal from "sweetalert2";
import { DeckListContext } from "../providers/deckListProvider/DeckListProvider";
// import cardList from "../cardList";

async function getDeckList() {
  // const res = await fetch(
  //   'http://127.0.0.1:8090/api/collections/deckLists/records?filter=(user.username="Test")',
  //   {cache: 'no-store'}
  // );
  // const data = await res.json();
  // console.log('data', data)
  // const res = await fetch(
  // 'http://127.0.0.1:8090/api/collections/deckLists/records?filter=(user.username="Test")',
  // {cache: 'no-store'}
  // );
  // const data = await res.json();
  // console.log('data', data)
}

type Props = {};

type State = {};

var loadDec = true;
var loadInc = true;
var loadChallenger = true;
var currEpicName = "";
var currChallengerName = "";
var deckCount = 0;

const checkEpic = (cardType: string) => {
  if (cardType[0] === "✦") return true;
  return false;
};

const getCardById = (id: string) => {
  const cardListDict = cardList;
  var cardFromDict = cardListDict[id as keyof typeof cardListDict];
  var returnCard = {
    cardNum: cardFromDict.cardNum.toString(),
    name: cardFromDict.name.toString(),
    imageName: "placeholder, MUST REPLACE LATER!",
    count: "1", // MUST GENERATE THIS LATER BY DETERMINING IF THE CARD EXISTS IN THE LIST YET
    cost: cardFromDict.cost.toString(),
    isEpic: checkEpic(cardFromDict.type),
  };

  return returnCard;
};

const canUseEpic = (cardToAdd: { isEpic: boolean; name: string }) => {
  return (
    currChallengerName === "JEX" ||
    !cardToAdd.isEpic ||
    currEpicName === "" ||
    cardToAdd.name === currEpicName
  );
};

const getAllowedLength = (currChallenger: string) => {
  if (currChallenger === "Byeah Prime") return 60;
  return 40;
};

const checkForMultipleEpics = () => {
  var foundInitialEpic = false;
  for (var card of currDeckArr) {
    if (card.isEpic && foundInitialEpic) {
      Swal.fire({
        title: "<strong>Warning!</strong>",
        html: "<b>You currently have multiple Epics in your deck without using JEX. Please remove additional epics.</b>",
        icon: "error",
        confirmButtonColor: "#257d52",
        confirmButtonText: "Thank you!",
      });
      break;
    } else if (card.isEpic) foundInitialEpic = true;
  }
};

var currDeckArr: {
  cost: string;
  cardNum: string;
  name: string;
  imageName: string;
  count: string;
  isEpic: boolean;
}[] = [];

const DeckCards = (props: { collectionView: boolean }) => {
  getDeckList();
  const {deckList, addToDeckList} = useContext(DeckListContext);
  const [deckArr, setDeckArr] = useState(deckList);
  // const [deckCount, setDeckCount] = useState(0);
  useEffect(() => {
    deckList && setDeckArr([...deckList]);
  }, [DeckListContext])

  if (loadChallenger) {
    loadChallenger = false;
    eventBus.on("addChallengerToDeck", (data: any) => {
      checkForMultipleEpics();
      if (currChallengerName === "JEX" && data.card.name !== "JEX")
        checkForMultipleEpics();
      currChallengerName = data.card.name;
      loadChallenger = true;
      setDeckArr([...currDeckArr]);
    });
  }
  if (loadInc) {
    loadInc = false;
    eventBus.on("addCardToDeck", (data: any) => {
      if (deckCount >= getAllowedLength(currChallengerName)) {
        setDeckArr([...currDeckArr]);
        loadInc = true;
        return;
      }
      var cardToAdd = getCardById(data.card.cardNum);
      if (canUseEpic(cardToAdd)) {
        var shouldBeAddedToDeck = true;
        for (var i = 0; i < currDeckArr.length; i++) {
          var cardFromDeck = currDeckArr[i];
          if (cardToAdd.name === cardFromDeck.name) {
            // matched card to add to full card info from Card DB
            if (
              parseInt(cardFromDeck.count) >= 3 &&
              cardToAdd.name !== "Byeah Beast"
            ) {
              var shouldBeAddedToDeck = false;
              break;
            }
            currDeckArr[i].count = util.toStringInc(currDeckArr[i].count);
            eventBus.dispatch("incrementDeckCounter", cardToAdd);
            deckCount++;
            shouldBeAddedToDeck = false;
            break;
          }
        }
        if (shouldBeAddedToDeck) {
          currDeckArr.push(cardToAdd);
          eventBus.dispatch("incrementDeckCounter", cardToAdd);
          deckCount++;
        }
        if (cardToAdd.isEpic) currEpicName = cardToAdd.name;
      }
      setDeckArr([...currDeckArr]);
      loadInc = true;
      eventBus.remove("addCardToDeck");
    });
  }

  if (loadDec) {
    loadDec = false;
    eventBus.on("removeCardFromDeck", (data: any) => {
      setDeckArr(currDeckArr);
      var cardToRemove = getCardById(data.card.cardNum);
      for (var i = 0; i < currDeckArr.length; i++) {
        var currCard = currDeckArr[i];
        if (currCard.cardNum === cardToRemove.cardNum) {
          // found card
          currDeckArr[i].count = util.toStringDec(currDeckArr[i].count);
          if (currDeckArr[i].count === "0") {
            currDeckArr.splice(i, 1);
            if (cardToRemove.isEpic) currEpicName = "";
          }
          eventBus.dispatch("decrementDeckCounter", cardToRemove);
          if (deckCount > 0) {
            deckCount--;
          }
          break;
        }
      }
      setDeckArr(currDeckArr);
      loadDec = true;
      eventBus.remove("removeCardFromDeck");
    });
    setDeckArr([...currDeckArr]);
  }
  console.log('deckArr', deckArr)
  return (
    <div className="deckCards" id="style-1">
      {deckArr?.map((card) => (
        <DeckCard
          cardNum={card.cardNum}
          name={card.name}
          imageName={card.imageName}
          count={card.count}
          cost={card.cost}
          isEpic={card.isEpic}
          key={card.cardNum}
        />
      ))}
    </div>
  );
};

export default DeckCards;
