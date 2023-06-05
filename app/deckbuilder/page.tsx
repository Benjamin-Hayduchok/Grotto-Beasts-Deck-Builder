"use client";

import CardList from '../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../components/deck'

export default function DeckBuilder() {
    return (
        <div>
            deck builder
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck>
                </Deck>
            </StickyBox>
            <br></br>
            <CardList></CardList>
        </div>
    )
}