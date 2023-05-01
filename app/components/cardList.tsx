"use client"; 

import './../../styles/globals.css';
import Card from './card';
import Container from 'react-bootstrap/Container';

const cardArray = [
    {name: "Mr. Greenz", imageName: "Mr.+Greenz.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Green Screen", imageName: "Green+Screen.webp", cardText: "When a Grotto you have in play is discarded, you may attach it face up onto Green Screen instead. When you would score a card, you may discard the top three cards of your deck instead. If you do, choose a Grotto attached to Green Screen and summon it free of cost."},
    {name: "Mr. Greenz", imageName: "B.F.+Bugleberry.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Bat+Boy.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Byeah+Prime.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Carl+Griffinsteed.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Demon+Lord+Zeraxos.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Glueman.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Grandpa.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Jerma.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Jerma+Earth.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Jerma+Moon.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Jerma+Venus.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "Jerma+Pluto.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "JEX.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", imageName: "The+Jerm.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."}
]

const CardList = () => {
    return (
        <Container style={{marginRight: "15vh"}}>
            {cardArray.map(card => (
                <Card 
                    name={card.name}
                    imageName={card.imageName}
                    cardText ={card.cardText}
                />
            ))}
        </Container>
    );
}

export default CardList
