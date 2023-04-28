import './../../styles/globals.css';
import Card from './card';

const cardArray = [
    {name: "Mr. Greenz", imageName: "Mr.+Greenz.webp", cardText: "When a card effect has you roll exactly one die, roll an additional die. You may choose which die result to use for the card effect. When you roll exactly two dice, if the result on both die is the same number, score three cards."},
    {name: "Green Screen", imageName: "Green+Screen.webp", cardText: "When a Grotto you have in play is discarded, you may attach it face up onto Green Screen instead. When you would score a card, you may discard the top three cards of your deck instead. If you do, choose a Grotto attached to Green Screen and summon it free of cost."}
]

const CardList = () => {
    return (
        <div>
            CardList Out div
            <div>
                {cardArray.map(card => (
                    <Card 
                        name={card.name}
                        imageName={card.imageName}
                        cardText ={card.cardText}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardList
