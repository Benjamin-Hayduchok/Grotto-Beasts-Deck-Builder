import { FC } from "react";
import SearchBar from "../searchBar";
import CardList, { CardsData } from "../cardList";
import { ResponsiveDeckWrapper } from "../responsiveDeckWrapper/ResponsiveDeckWrapper";
import Deck from "../deck/deck";
import { DeckListProvider } from "../providers/deckListProvider/DeckListProvider";
import classNames from "classnames";

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
            <div
              className={classNames(
                "bg-gb-brown rounded-md overflow-hidden",
                "h-full w-full shadow-2xl shadow-[rgba(0,0,0,0.35)]",
                "border-4 border-[rgb(224,180,34)]"
              )}
            >
              <Deck isCollection={false} />
            </div>
          </ResponsiveDeckWrapper>
        </div>
      </DeckListProvider>
    </div>
  );
};
