"use client";

import CardList from './components/cardList';
import StickyBox from "react-sticky-box";
import Deck from './components/deck'

export default function HomePage() {
    if (window) window.location.href = new URL(window.location.href).origin + "/deckbuilder?new";
    // Will likely add something here once the stack has enough to display for a homepage if decided upon
    // return (
    //     <div>
    //         home page
    //         <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
    //             <Deck collectionView={false}>
    //             </Deck>
    //         </StickyBox>
    //         <br></br>
    //         <CardList collectionView={false}></CardList>
    //     </div>
    // )
}