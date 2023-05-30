"use client"; 

import './../../styles/globals.css';
import Card from './card';
import Container from 'react-bootstrap/Container';
import SearchBar from './searchBar'
import allCards from './card-list.json'


var cardTest = [];
for (var card in allCards) {
    cardTest.push(allCards[card as keyof typeof allCards])
}
var cardArray = cardTest;

const CardList = () => {
    return (
        <Container className="containerCardList">
            <SearchBar></SearchBar>

            {cardArray.map(card => (
                <Card
                    name={card.name}
                    imageName={card.imageName}
                    effect ={card.effect}
                    cardNum = {card.cardNum}
                />
            ))}
        </Container>
    );
}

export default CardList
