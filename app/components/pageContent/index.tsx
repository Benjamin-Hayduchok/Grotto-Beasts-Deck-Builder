import { FC } from "react";
import SearchBar from "../searchBar";
import CardList, { CardsData } from "../cardList";
import { ResponsiveDeckWrapper } from "../responsiveDeckWrapper/ResponsiveDeckWrapper";
import Deck from "../deck/deck";
import { DeckListProvider } from "../providers/deckListProvider/DeckListProvider";

export type PageContentProps = {
  cardList: CardsData[];
};

export const PageContent: FC<PageContentProps> = ({ cardList }) => {
  return (
    <div>
      <DeckListProvider>
        <SearchBar></SearchBar>
        <div className={"flex p-8"}>
          <CardList collectionView={true} cardArray={Object.values(cardList)} />
          <ResponsiveDeckWrapper>
            <div className="bg-gb-brown rounded-md h-full w-full shadow-2xl">
              <Deck collectionView={false} />
            </div>
          </ResponsiveDeckWrapper>
        </div>
      </DeckListProvider>
    </div>
  );
};
