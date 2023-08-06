"use client";

import { useContext, useState } from "react";
import { CardDataContext } from "../../components/providers/cardDataProvider";
import { PageContent } from "@/app/components/pageContent";

export default function DeckBuilder({params}: any) {
  const { cardsData } = useContext(CardDataContext);
  const [cardList, setCardList] = useState(Object.assign({}, cardsData));

  return <PageContent id={params.id} cardList={cardList} saveType={"deckBuilder"}/>;
}
