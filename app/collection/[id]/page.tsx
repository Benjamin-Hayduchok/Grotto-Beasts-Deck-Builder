"use client";

import CardList from '../../components/cardList';
import StickyBox from "react-sticky-box";
import Deck from '../../components/deck';
import { PocketBaseContext } from "../../components/providers/pocketBaseProvider/PocketBaseProvider";
import { useContext } from "react";

const CollectionPage = ({ params }: any) => {
    console.log('params.id', params.id);    
    const pocketBaseConnection = useContext(PocketBaseContext);

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