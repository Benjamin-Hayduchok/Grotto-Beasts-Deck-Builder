"use client";

import CardList from '../../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import PocketBase from 'pocketbase';

const CollectionPage = (props: any) => {
    const pb = new PocketBase('https://grotto-beasts-test.fly.dev'); 
    console.log(pb.authStore.token);


    return (
        <div>
            <br></br>
            <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
                <Deck collectionView={true}>
                </Deck>
            </StickyBox>
            <CardList collectionView={true}></CardList>
        </div>
    )
}

export default CollectionPage;