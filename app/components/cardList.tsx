"use client";

import { Card } from "./tailwindComponents/card/card";
import Container from "react-bootstrap/Container";
import SearchBar from "./searchBar";
import allCards from "./card-list.json";
import eventBus from "./eventBus";
import React, { useContext, useState, useEffect } from "react";
import { CardDataContext } from "./providers/cardDataProvider/CardDataProvider";

var loadEventBus = true;

export type CardsData = {
  name: string;
  power: any;
  goal: any;
  cost: any;
  effect: string;
  flavorText: string;
  type: string;
  artist: string;
  imageName: string;
  deckCardImage: string;
  cardNum: string;
  collectionCount: number;
};

const isSearchInCardValue = (search: string, value: string) => {
  return value.toLowerCase().includes(search.toLowerCase());
};

const isEpicInCardValue = (search: string, value: string) => {
  return (
    search === "Any" ||
    (search === "yes" && value[0] === "✦") ||
    (search === "no" && value[0] !== "✦")
  );
};

const isNumberInCardValue = (search: string, value: string) => {
  if (search == "") return true;
  if (value == "-") return false; // it is not applicable to this card if it has -
  const re = /(\d.*)/g;
  var numMatch: string | number | RegExpExecArray | null = re.exec(search);
  if (numMatch) {
    var num = numMatch.pop();
    if (num) {
      var numSearch = parseInt(num);
      var opMatch = search.replaceAll(re, "");
      switch (opMatch) {
        case "<":
          return parseInt(value) < numSearch;
        case ">":
          return parseInt(value) > numSearch;
        case "<=":
          return parseInt(value) <= numSearch;
        case ">=":
          return parseInt(value) >= numSearch;
        case "!=":
          return parseInt(value) != numSearch;
        case "=":
          return parseInt(value) == numSearch;
        default:
          return parseInt(value) == numSearch;
      }
    }
  }
  return false;
};

const CardList = (props: {
  collectionView: boolean;
  cardArray: CardsData[];
}) => {
  const [cardList, setCardList] = useState(props.cardArray);

  useEffect(() => {
    setCardList(props.cardArray);
  }, []);

  const updateCollectionCount = (isIncremented: boolean, cardNum: string) => {
    var cardToUpdateIndex = cardList.findIndex(
      (card) => card.cardNum === cardNum
    );
    if (isIncremented) {
      cardList[cardToUpdateIndex].collectionCount++; // need to update to find the card with that cardNum instead of querying the index value right away
      setCardList(cardList);
      // setCardList([...cardList]); // WORKS BUT IS SO SLOW
      return;
    }
    cardList[cardToUpdateIndex].collectionCount--;
    setCardList(cardList);
    // setCardList([...cardList]); // WORKS BUT IS SO SLOW
  };

  if (loadEventBus) {
    loadEventBus = false;
    eventBus.on("searchSubmit", (search: any) => {
      loadEventBus = true;
      var newList = props.cardArray.filter((currCard) => {
        return (
          isSearchInCardValue(search.name, currCard.name) &&
          isSearchInCardValue(search.type, currCard.type) &&
          isEpicInCardValue(search.epic, currCard.type) &&
          isNumberInCardValue(search.power, currCard.power) &&
          isNumberInCardValue(search.goal, currCard.goal) &&
          isNumberInCardValue(search.cost, currCard.cost) &&
          isSearchInCardValue(search.effect, currCard.effect)
        );
      });
      setCardList([...newList]);
    });
  }

  return (
    // <Container className="containerCardList">
    <div className="flex w-full gap-6 flex-wrap justify-center">
      {cardList.map((card) => (
        <Card
          name={card.name}
          imageName={card.imageName}
          effect={card.effect}
          cardNum={card.cardNum}
          collectionView={props.collectionView}
          collectionCount={card.collectionCount}
          updateCollectionCount={updateCollectionCount}
          key={card.cardNum}
        />
      ))}
    </div>
    // </Container>
  );
};

export default CardList;
