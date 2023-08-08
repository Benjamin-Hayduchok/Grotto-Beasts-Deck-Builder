"use client";

import { useContext, useEffect, useState } from "react";
import {
  CardDataContext,
} from "../../components/providers/cardDataProvider";
import { PageContent } from "@/app/components/pageContent";

export default function CollectionPage({ params }: any) {
  const { cardsData, pageType, userId, deckLists, saveCollection } = useContext(CardDataContext);
  const [cardList, setCardList] = useState(Object.assign({}, cardsData));

  useEffect(() => {
  }, []);

  return (
    <PageContent
      cardList={cardList}
      id={params.id}
      saveCollection={saveCollection}
      userId={userId}
      deckLists={deckLists}
      pageType={pageType}
    />
  );
}
