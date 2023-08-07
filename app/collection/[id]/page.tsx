"use client";

import { useContext, useEffect, useState } from "react";
import {
  CardsData,
  CardDataContext,
} from "../../components/providers/cardDataProvider";
import { PocketBaseContext } from "../../components/providers/pocketBaseProvider/PocketBaseProvider";
import Swal from "sweetalert2";
import { PageContent } from "@/app/components/pageContent";

type collectionCountObjType = { [key: number]: number };

const setCollectionCounts = (collectionCounts: any, cardsData: any) => {
  for (var collectionCount in collectionCounts) {
    var currCard = cardsData[parseInt(collectionCount) - 1]; // subtracting 1 to convert array index to cardNum
    if (currCard)
      currCard.collectionCount = collectionCounts[parseInt(collectionCount)];
  }
  return cardsData;
};

async function getCollectionCount(id: string) {
  const res = await fetch(
    `https://grotto-beasts-test.fly.dev/api/collections/cardCollection/records/${id}`
  );
  const data = await res.json();
  return data;
}

const createCollectionCountObj = (cardList: CardsData[]) => {
  var collectionCountObj: collectionCountObjType = {};
  for (var index in cardList) {
    var card = cardList[index];
    if (card.collectionCount > 0) {
      collectionCountObj[parseInt(index) + 1] = card.collectionCount; // adding 1 to convert array index to cardNum
    }
  }
  return collectionCountObj;
};

export default function CollectionPage({ params }: any) {
  const { cardsData, pageType } = useContext(CardDataContext);
  const pocketBaseConnection = useContext(PocketBaseContext);
  const [cardList, setCardList] = useState(Object.assign({}, cardsData));
  const [userId, setUserId] = useState("");
  const [deckLists, setDeckLists] = useState([]);

  useEffect(() => {
    if (params.id === "new") return;
    getCollectionCount(params.id).then((data) => {
      setCardList(setCollectionCounts(data?.collection, cardsData));
      setUserId(data?.user);
      setDeckLists(data?.deckLists ? data?.deckLists : []);
    });
  }, []);
  async function saveCollectionCount(
    id: string,
    collectionCountObj: collectionCountObjType,
    userId: string
  ) {
    const patchData = { collection: collectionCountObj, user: userId };
    try {
      const record = await pocketBaseConnection
        ?.collection("cardCollection")
        .update(id, patchData);
      if (record) {
        Swal.fire({
          title: "<strong>Collection Saved!</strong>",
          icon: "success",
          confirmButtonColor: "#257d52",
          confirmButtonText: "OK",
        });
        return;
      }
    } catch {
      Swal.fire({
        title: "<strong>Error Saving Collection.</strong>",
        html: "<p>You are not the owner of the Collection.</p>",
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
    }
  }

  const saveCollection = () => {
    if (!pocketBaseConnection?.authStore.isValid) {
      Swal.fire({
        title: "<strong>YOU ARE NOT LOGGED IN</strong>",
        html: '<a href="/login" style="color:blue;"><u>Click here to go to the Login Page...<u></a>',
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return;
    }
    const collectionCountObj = createCollectionCountObj(cardList);
    saveCollectionCount(params.id, collectionCountObj, userId).then((result) =>
      console.log("result", result) // should delete at some pt
    );
  };

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
