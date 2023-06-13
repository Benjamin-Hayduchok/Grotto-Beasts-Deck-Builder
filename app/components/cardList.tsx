"use client"; 

import './../../styles/globals.css';
import Card from'./card';
import Container from 'react-bootstrap/Container';
import SearchBar from './searchBar';
import allCards from './card-list.json';
import eventBus from './eventBus';
import React, { useState } from 'react'

var loadEventBus = true;

var formattedAllCards: { name: string, power: any, goal: any, cost: any, effect: string, flavorText: string, type: string, artist: string, imageName: string, deckCardImage: string, cardNum: string }[] = [];

for (var card in allCards) {
    formattedAllCards.push(allCards[card as keyof typeof allCards]);
}
var cardArray = formattedAllCards;

const isSearchInCardValue = (search: string, value: string) => {
    return value.toLowerCase().includes(search.toLowerCase());
}

const isEpicInCardValue = (search: string, value: string) => {
    return search === "Any" || (search === "yes" && value[0] === '✦') || (search === "no" && value[0] !== '✦');
}

const isNumberInCardValue = (search: string, value: string) => {
    if (search == "") return true;
    if (value == "-") return false; // it is not applicable to this card if it has -
    const re = /(\d.*)/g;
    var numMatch: string | number | RegExpExecArray | null = re.exec(search);
    if (numMatch) {
        var num = numMatch.pop()
        if (num) {
            var numSearch = parseInt(num);
            var opMatch = search.replaceAll(re, "");
            switch (opMatch) {
                case "<":   return parseInt(value) < numSearch;
                case ">":   return parseInt(value) > numSearch;
                case "<=":  return parseInt(value) <= numSearch;
                case ">=":  return parseInt(value) >= numSearch;
                case "!=":  return parseInt(value) != numSearch;
                case "=":  return parseInt(value) == numSearch;
                default:    return parseInt(value) == numSearch;
            }
        }
    }
    return false;
}

const CardList = (props: {collectionView: boolean}) => {
    const [cardList, setCardList] = useState(cardArray);

    if (loadEventBus) {
        loadEventBus = false;
        eventBus.on("searchSubmit", (search: any) => {
                loadEventBus = true;
                var newList = formattedAllCards.filter(currCard => {
                    return  isSearchInCardValue(search.name, currCard.name) &&
                            isSearchInCardValue(search.type, currCard.type) &&
                            isEpicInCardValue(search.epic, currCard.type) &&
                            isNumberInCardValue(search.power, currCard.power) &&
                            isNumberInCardValue(search.goal, currCard.goal) &&
                            isNumberInCardValue(search.cost, currCard.cost) &&
                            isSearchInCardValue(search.effect, currCard.effect)
                });
                setCardList([...newList])
            }
        );
    }

    return (
        <Container className="containerCardList">
            <SearchBar></SearchBar>

            {cardList.map(card => (
                <Card
                    name={card.name}
                    imageName={card.imageName}
                    effect ={card.effect}
                    cardNum = {card.cardNum}
                    collectionView = {props.collectionView}
                    key={card.cardNum}
                />
            ))}
        </Container>
    );
}

export default CardList
