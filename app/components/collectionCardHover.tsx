import React, { useState } from "react";
import './../../styles/collection.css';
import CardPlusButtom from './cardPlusButton';
import CardMinusButton from './cardMinusButton';
import CollectionCardCount from './collectionCardCount'
import util from "./util";



export default function CollectionCardHover(props: {collectionView: boolean}) {
    const [cardCount, setCardCount] = useState("0");

    const plusPressed = () => {
        setCardCount(util.toStringInc(cardCount));
    }

    const minusPressed = () => {
        setCardCount(util.toStringDec(cardCount));
    }

    if (props.collectionView) {
        return (
            <div className='collectionCardHoverContainer'>
                <CardMinusButton cardDec={minusPressed}/>
                <CollectionCardCount count={cardCount}/>
                <CardPlusButtom cardInc={plusPressed}/>
            </div>
        )
    }
    return (
        <div>
        </div>
    )
}