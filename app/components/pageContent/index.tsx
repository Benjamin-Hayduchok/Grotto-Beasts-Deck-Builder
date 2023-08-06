import { FC } from "react";
import SearchBar from "../searchBar";
import CardList, { CardsData } from "../cardList";
import { ResponsiveDeckWrapper } from "../responsiveDeckWrapper/ResponsiveDeckWrapper";
import Deck from "../deck/deck";
import { DeckListProvider } from "../providers/deckListProvider/DeckListProvider";
import { SaveButton } from "../saveButton";

export type PageContentProps = {
  cardList: CardsData[];
  id: string;
  saveType: string;
  saveCollection?: Function;
};

export const PageContent: FC<PageContentProps> = ({
  cardList,
  id,
  saveType,
  saveCollection,
}) => {
  return (
    <div>
      <DeckListProvider id={id}>
        <SearchBar></SearchBar>
        <div className={"flex p-8"}>
          <CardList collectionView={true} cardArray={Object.values(cardList)} />
          <ResponsiveDeckWrapper>
            <div className="bg-gb-brown rounded-md h-full w-full shadow-2xl">
              <Deck collectionView={false} />
            </div>
            <SaveButton
              saveType={saveType}
              saveCollection={saveCollection}
            ></SaveButton>
          </ResponsiveDeckWrapper>
        </div>
      </DeckListProvider>
    </div>
  );
};
