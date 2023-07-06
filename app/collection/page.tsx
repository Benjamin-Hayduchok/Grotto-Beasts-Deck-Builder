"use client";

import { PocketBaseContext } from "../components/providers/pocketBaseProvider/PocketBaseProvider";
import { useContext } from "react";

const CollectionPage = (props: any) => {
    const pocketBaseConnection = useContext(PocketBaseContext);
    console.log('pocketBaseConnection', pocketBaseConnection)
    // if (typeof window !== "undefined") window.location.href = new URL(window.location.href).origin + "/collection/new";
    // const pb = new PocketBase('https://grotto-beasts-test.fly.dev'); 
    // console.log(pb.authStore.token);


    // return (
    //     <div>
    //         <br></br>
    //         <StickyBox className='deckSticky' offsetTop={20} offsetBottom={20}>
    //             <Deck collectionView={true}>
    //             </Deck>
    //         </StickyBox>
    //         <CardList collectionView={true}></CardList>
    //     </div>
    // )
}

export default CollectionPage;