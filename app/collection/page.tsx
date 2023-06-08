"use client";

import CardList from '../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../components/deck'

const CollectionPage = (props: any) => {
    return (
        <div>
            <br></br>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck collectionView={true}>
                </Deck>
            </StickyBox>
            <CardList></CardList>
        </div>
    )
}

export default CollectionPage;