import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { CardDataContext } from "../cardDataProvider";
import Swal from "sweetalert2";

const parseCardIntoDeckCard = (cardObj: any) => {
  return {
    cost: cardObj.cost,
    cardNum: cardObj.cardNum,
    name: cardObj.name,
    imageName: cardObj.deckCardImage,
    count: 1,
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

function createDeckListObj(deckList: dbDeckListObjType, cardsData: any) {
  if (!cardsData) {
    return [];
  }
  var deckListInit: DeckListType[] = [];
  for (var cardNum in deckList) {
    var cardObj = cardsData[parseInt(cardNum) - 1];
    var parsedCard = parseCardIntoDeckCard(cardObj);
    deckListInit.push(parsedCard);
  }
  return deckListInit;
}

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
});

type test = {
  children: ReactNode;
  id: string;
};

export const DeckListProvider: FC<test> = ({ children, id }) => {
  const [deckList, setDeckList] = useState<DeckListType[]>(
    [] // should be populated with API call to get decklist
  );
  const [challenger, setChallenger] = useState<string>(
    "None" // should be populated with API call to get decklist
  );
  const [deckListLength, setDeckListLength] = useState<number>(
    0 // should be populated with API call to get decklist
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
    if (typeof cardsData === "undefined" || typeof deckList === "undefined") {
      return;
    }
    var cardObj = cardsData[parseInt(cardNum) - 1];
    var copyDeckList = [...deckList];
    for (var i = 0; i < copyDeckList.length; i++) {
      // attempting to remove card from decklist
      var deckCard = copyDeckList[i];
      if (cardNum === deckCard.cardNum) {
        // found card to remove
        if (deckCard.count <= 1) {
          // delete card from array
          copyDeckList.splice(i, 1);
          cardObj.type[0] === "✦" &&
            setEpicArray(
              epicArray.filter((currCardNum) => currCardNum !== cardNum)
            );
        } else {
          copyDeckList[i].count--;
        }
        setDeckListLength(deckListLength - 1);
        break;
      }
    }
    setDeckList([...copyDeckList]);
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
      }}
    >
      {children}
    </DeckListContext.Provider>
  );
};
