"use client";

import CardList from "../../components/cardList";
import StickyBox from "react-sticky-box";
import Deck from "../../components/deck";
import PocketBase from "pocketbase";
import SearchBar from "@/app/components/searchBar";

const CollectionPage = (props: any) => {
  const pb = new PocketBase("https://grotto-beasts-test.fly.dev");
  console.log(pb.authStore.token);

  return (
    <div>
      <SearchBar></SearchBar>
      <StickyBox className="deckSticky" offsetTop={20} offsetBottom={20}>
        <Deck collectionView={true} />
      </StickyBox>
      <CardList collectionView={true}></CardList>
    </div>
  );
};

export default CollectionPage;
