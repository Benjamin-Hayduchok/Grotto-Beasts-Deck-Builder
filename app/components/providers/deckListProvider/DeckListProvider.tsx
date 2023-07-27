import {
    FC,
    PropsWithChildren,
    createContext,
    useState,
    useContext
  } from "react";
  import util from "../../util";
  import { CardDataContext } from "../cardDataProvider/CardDataProvider";
  
  export type DeckListType = {
    cost: string;
    cardNum: string;
    name: string;
    imageName: string;
    count: string;
    isEpic: boolean;
  };

  type DeckListContextType = {
    deckList: DeckListType[] | undefined;
    addToDeckList: (cardNum: string) => void;
    removeFromDeckList: (cardNum: string) => void;
  };
  
  export const DeckListContext = createContext<DeckListContextType>({
        deckList: undefined,
        addToDeckList: () => {},
        removeFromDeckList: () => {}
  });
  
  export const DeckListProvider: FC<PropsWithChildren> = ({ children }) => {
    const [deckList, setDeckList] = useState<DeckListType[]>(
      [] // should be populated with API call to get decklist
    );
    const CardData = useContext(CardDataContext);

    const addToDeckList = (cardNum: string) => {
        console.log("context adding")
        if (typeof CardData === "undefined" || typeof deckList === "undefined") {
            return
        }
        for (var index in deckList) {
            var deckCard = deckList[index];
            if (cardNum === deckCard.cardNum) {
                if (deckCard.count !== "3") {
                    deckList[index].count = util.toStringInc(deckList[index].count);
                }
                return;
            }
        }
        var cardObj = CardData[parseInt(cardNum) - 1]
        var parsedCard = {
            cost: cardObj.cost,
            cardNum: cardObj.cardNum,
            name: cardObj.name,
            imageName: cardObj.deckCardImage,
            count: "1",
            isEpic: cardObj.type[0] === '✦'
        }
        deckList.push(parsedCard);
    }

    const removeFromDeckList = (cardNum: string) => {
        console.log("context remove hit")
    }
    
    return (
        <DeckListContext.Provider 
            value={{
                deckList,
                addToDeckList,
                removeFromDeckList
            }}
        >
            {children}
        </DeckListContext.Provider>
    );
  };
  