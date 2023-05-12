"use client"; 

import './../../styles/globals.css';
import Card from './card';
import Container from 'react-bootstrap/Container';

var cardArray = [
    {name: "Mr. Greenz", cardNum: "6", imageName: "Mr.+Greenz.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Green Screen", cardNum: "16", imageName: "Green+Screen.webp", cardText: "When a Grotto you have in play is discarded, you may attach it face up onto Green Screen instead. When you would score a card, you may discard the top three cards of your deck instead. If you do, choose a Grotto attached to Green Screen and summon it free of cost."},
    {name: "Mr. Greenz", cardNum: "2", imageName: "B.F.+Bugleberry.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "15", imageName: "Bat+Boy.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "14", imageName: "Byeah+Prime.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "8", imageName: "Carl+Griffinsteed.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "4", imageName: "Demon+Lord+Zeraxos.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "1", imageName: "Glueman.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "3", imageName: "Grandpa.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "7", imageName: "Jerma.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "9", imageName: "Jerma+Earth.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "10", imageName: "Jerma+Moon.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "11", imageName: "Jerma+Venus.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "12", imageName: "Jerma+Pluto.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "5", imageName: "JEX.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Mr. Greenz", cardNum: "13", imageName: "The+Jerm.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."}
]
// const cardArrayUse = useState();

// componentDidMount() {
//     eventBus.on("couponApply", (data) =>
//       this.setState({ message: data.message })
//     );
//   }



const CardList = () => {
    return (
        <Container className="containerCardList">
            {cardArray.map(card => (
                <Card
                    name={card.name}
                    imageName={card.imageName}
                    cardText ={card.cardText}
                    cardNum = {card.cardNum}
                />
            ))}
        </Container>
    );
}

export default CardList
