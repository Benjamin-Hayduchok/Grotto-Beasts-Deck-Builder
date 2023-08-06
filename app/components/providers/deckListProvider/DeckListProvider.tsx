import {
  FC,
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { CardDataContext } from "../cardDataProvider";
import Swal from "sweetalert2";
import { PocketBaseContext } from "../pocketBaseProvider/PocketBaseProvider";

const parseCardIntoDeckCard = (cardObj: any, cardCount: number = 1) => {
  return {
    cost: cardObj.cost,
    cardNum: cardObj.cardNum,
    name: cardObj.name,
    imageName: cardObj.deckCardImage,
    count: cardCount,
    isEpic: cardObj.type[0] === "✦",
  };
};

type dbDeckListObjType = { [key: string]: string };

async function getDeckList(id: string) {
  const res = await fetch(
    `https://grotto-beasts-test.fly.dev/api/collections/decklists/records/${id}`
  );
  const data = await res.json();
  return data;
}

function createDeckListObj(
  deckList: dbDeckListObjType,
  cardsData: any
): DeckListType[] {
  if (!cardsData) {
    return [];
  }
  return Object.entries(deckList).map(([cardNum, cardCount]) => {
    const cardObj = cardsData[parseInt(cardNum) - 1];
    return parseCardIntoDeckCard(cardObj, parseInt(cardCount));
  });
}

const formatDeckObj = (currDeckObj: any): { [key: number]: number } => {
  return currDeckObj.reduce(
    (returnObj: { [x: string]: any }, { cardNum, count }: any) => {
      if (count > 0) {
        returnObj[cardNum] = count;
      }
      return returnObj;
    },
    {}
  );
};

export type DeckListType = {
  cost: string;
  cardNum: string;
  name: string;
  imageName: string;
  count: number;
  isEpic: boolean;
};

type DeckListContextType = {
  deckList: DeckListType[] | undefined;
  challenger: string;
  deckListLength: number;
  epicArray: String[];
  addToDeckList: (cardNum: string) => void;
  removeFromDeckList: (cardNum: string) => void;
  forceRender: boolean;
  forceRenderDispatch: () => void;
  saveDeckList: () => void;
};

export const DeckListContext = createContext<DeckListContextType>({
  deckList: undefined,
  challenger: "None",
  deckListLength: 0,
  epicArray: [],
  addToDeckList: () => {},
  removeFromDeckList: () => {},
  forceRender: false,
  forceRenderDispatch: () => {},
  saveDeckList: () => {},
});

type DeckListProviderType = {
  children: ReactNode;
  id: string;
};

export const DeckListProvider: FC<DeckListProviderType> = ({
  children,
  id,
}) => {
  const pocketBaseConnection = useContext(PocketBaseContext);

  const [deckList, setDeckList] = useState<DeckListType[]>(
    [] // should be populated with API call to get decklist
  );
  const [challenger, setChallenger] = useState<string>(
    "None" // should be populated with API call to get decklist
  );
  const [deckListLength, setDeckListLength] = useState<number>(
    0 // should be populated with API call to get decklist
  );
  const [userId, setUserId] = useState<string>(
    "" // should be populated with API call to get decklist
  );
  const [epicArray, setEpicArray] = useState<String[]>(
    [] // should be populated with API call to get decklist
  );
  const [forceRender, forceRenderDispatch] = useReducer(
    (state) => !state,
    false
  );

  useEffect(() => {
    if (id === "new") return;
    getDeckList(id).then((data) => {
      setDeckList(createDeckListObj(data?.decklist, cardsData));
      setChallenger(data?.challenger || "None");
      setDeckListLength(data?.decklistLength || 0);
      setUserId(data?.user);
      setEpicArray(data?.epicArray);
    });
  }, []);

  const { cardsData } = useContext(CardDataContext);

  const addToDeckList = (cardNum: string) => {
    if (typeof cardsData === "undefined" || typeof deckList === "undefined") {
      return;
    }
    var cardObj = cardsData[parseInt(cardNum) - 1];

    if (cardObj && parseInt(cardObj.cardNum) <= 32) {
      // checking if card is challenger to set
      setChallenger(cardObj.name);
      return; // nothing else to be added, just updating challenger
    }

    var deckListLimit = challenger === "Byeah Prime" ? 60 : 40;

    if (deckListLength >= deckListLimit) {
      Swal.fire({
        title: "<strong>Card Limit Reached</strong>",
        html: `<b>Can only have ${deckListLimit} cards in your deck.</b>`,
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return; // BEN NOTE: MIGHT UPDATE THIS LATER TO SHOW SWAL IF CHANGING FROM BYEAH PRIME
    }
    if (
      cardObj.type[0] === "✦" && // if card is epic
      epicArray.length !== 0 &&
      challenger !== "JEX" &&
      !epicArray.includes(cardObj.cardNum)
    ) {
      Swal.fire({
        title: "<strong>Cannot add more than one Epic without JEX</strong>",
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      });
      return; // can't have more than one epic if you don't have jex
    }

    var copyDeckList = [...deckList];

    for (var i = 0; i < copyDeckList.length; i++) {
      // attempting to add card to decklist
      var deckCard = copyDeckList[i];
      if (cardNum === deckCard.cardNum) {
        if (deckCard.count !== 3 || cardObj.name === "Byeah Beast") {
          // can have unlimited byeah beast
          copyDeckList[i].count++;
          setDeckListLength(deckListLength + 1);
        }
        return;
      }
    }
    var parsedCard = parseCardIntoDeckCard(cardObj);
    copyDeckList.push(parsedCard);
    parsedCard.isEpic && setEpicArray([...epicArray, parsedCard.cardNum]);
    setDeckListLength(deckListLength + 1);
    setDeckList([...copyDeckList]);
  };

  const removeFromDeckList = (cardNum: string) => {
    if (!cardsData || !deckList) {
      return;
    }
    const cardObj = cardsData[parseInt(cardNum) - 1];
    // Find the index of the card in the deckList
    const cardIndex = deckList.findIndex(
      (deckCard) => deckCard.cardNum === cardNum
    );
    // Return early if the card is not found in the deckList
    if (cardIndex === -1) {
      return;
    }
    const copyDeckList = [...deckList];
    if (copyDeckList[cardIndex].count <= 1) {
      copyDeckList.splice(cardIndex, 1);
      // Remove the card from the epicArray when its count is 0
      if (cardObj.type[0] === "✦") {
        setEpicArray((prevEpicArray) =>
          prevEpicArray.filter((currCardNum) => currCardNum !== cardNum)
        );
      }
    } else {
      copyDeckList[cardIndex].count--;
    }
    setDeckListLength((prevDeckListLength) => prevDeckListLength - 1);
    setDeckList(copyDeckList);
  };

  // need to add collectionId to this in some way. will likely grab from local storage as it should be stored there
  const saveDeckToDB = async (deckObj: any) => {
    const data = {
      user: userId,
      decklist: deckObj,
      challenger: challenger,
      decklistLength: deckListLength,
      collectionid: localStorage.getItem("collectionCountId"), // possibly need to be updated
      epicArray: epicArray,
    };
    try {
      const record = await pocketBaseConnection
        ?.collection("decklists")
        .update(id, data);
      return record;
    } catch {
      return;
    }
  };

  const saveDeckList = () => {
    if (!deckList) {
      return;
    }
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
    saveDeckToDB(formatDeckObj(deckList)).then((result) => {
      console.log("result", result);
      if (result) {
        Swal.fire({
          title: "<strong>Decklist Saved!</strong>",
          icon: "success",
          confirmButtonColor: "#257d52",
          confirmButtonText: "OK",
        });
        return;
      }
      Swal.fire({
        title: "<strong>Error Saving Deck.</strong>",
        html: "<p>You are not the owner of the deck.</p>",
        icon: "error",
        confirmButtonColor: "#f27474",
        confirmButtonText: "Close",
      }); // should allow copy as some pt
    });
  };

  return (
    <DeckListContext.Provider
      value={{
        deckList,
        challenger,
        deckListLength,
        epicArray,
        addToDeckList,
        removeFromDeckList,
        forceRender,
        forceRenderDispatch,
        saveDeckList,
      }}
    >
      {children}
    </DeckListContext.Provider>
  );
};
