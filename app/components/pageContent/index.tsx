import { FC } from "react";
import { CardsData } from "../cardList";
import { PageTypes } from "../../components/providers/cardDataProvider";
import { DeckListProvider } from "../providers/deckListProvider/DeckListProvider";
import { CommonPageContent } from "./commonPageContent";

export type PageContentProps = {
  cardList: CardsData[];
  id: string;
  saveCollection?: Function;
  userId?: string;
  deckLists?: string[];
  pageType?: string;
};

export const PageContent: FC<PageContentProps> = ({
  cardList,
  id,
  saveCollection,
  userId,
  deckLists,
  pageType,
}) => {
  if (pageType === PageTypes.DECKBUILDER) {
    return (
      <div>
        <DeckListProvider id={id}>
          <CommonPageContent
            cardList={cardList}
            saveType={pageType}
            saveCollection={saveCollection}
            userId={userId}
            deckLists={deckLists}
          />
        </DeckListProvider>
      </div>
    );
  } else if (pageType === PageTypes.COLLECTION) {
    return (
      <CommonPageContent
        cardList={cardList}
        saveType={pageType}
        saveCollection={saveCollection}
        userId={userId}
        deckLists={deckLists}
      />
    );
  } else {
    return <></>;
  }
};
