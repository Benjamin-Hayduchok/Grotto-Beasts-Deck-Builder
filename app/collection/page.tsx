"use client";

import { PocketBaseContext } from "../components/providers/pocketBaseProvider/PocketBaseProvider";
import { useContext } from "react";

const CollectionPage = (props: any) => {
    const pocketBaseConnection = useContext(PocketBaseContext);
    console.log('pocketBaseConnection', pocketBaseConnection);

    if (typeof window !== "undefined" && pocketBaseConnection?.authStore.isValid) {
        const collectionId = localStorage.getItem('collectionCountId');
        if (collectionId !== null && collectionId.length > 0) {
            window.location.href = new URL(window.location.href).origin + "/collection/" + collectionId;
            return;
        }
    }
    window.location.href = new URL(window.location.href).origin + "/collection/new"; // should check if collectionId is in localStorage
    // note: should not redirect them to their respective collection if the token is valid based on token


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