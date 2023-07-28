"use client";

import StickyBox from "react-sticky-box";
import { useContext, useEffect, useState } from "react";
import { CardDataContext } from "../../components/providers/cardDataProvider";
import { PageContent } from "@/app/components/pageContent";

export default function DeckBuilder() {
  const { cardsData } = useContext(CardDataContext);
  const [cardList, setCardList] = useState(Object.assign({}, cardsData));

  return <PageContent cardList={cardList} />;
}
