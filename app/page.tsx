"use client";

import CardList from './components/cardList';
import StickyBox from "react-sticky-box";
import Deck from './components/deck'
// import Deck from 

export default function HomePage() {
    return (
        <div>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck>
                </Deck>
            </StickyBox>
            <br></br>
            <CardList></CardList>
        </div>
    )
}