import {
    FC,
    PropsWithChildren,
    createContext,
    useState,
    useContext,
    useReducer
  } from "react";
  import util from "../../util";
  import { CardDataContext } from "../cardDataProvider";
  
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
    forceRender: boolean;
    forceRenderDispatch: () => void;
  };
  
  export const DeckListContext = createContext<DeckListContextType>({
        deckList: undefined,
        addToDeckList: () => {},
        removeFromDeckList: () => {},
        forceRender: false,
        forceRenderDispatch: () => {}
  });
  
  export const DeckListProvider: FC<PropsWithChildren> = ({ children }) => {
    const [deckList, setDeckList] = useState<DeckListType[]>(
      [] // should be populated with API call to get decklist
    );
    const [forceRender, forceRenderDispatch] = useReducer((state) => !state, false);
    const { cardsData } = useContext(CardDataContext);

    const addToDeckList = (cardNum: string) => {
        console.log("context adding")
        if (typeof cardsData === "undefined" || typeof deckList === "undefined") {
            return
        }
        var copyDeckList = [...deckList];
        for (var index in copyDeckList) {
            var deckCard = copyDeckList[index];
            if (cardNum === deckCard.cardNum) {
                if (deckCard.count !== "3") {
                    copyDeckList[index].count = util.toStringInc(copyDeckList[index].count);
                }
                return;
            }
        }
        var cardObj = cardsData[parseInt(cardNum) - 1]
        var parsedCard = {
            cost: cardObj.cost,
            cardNum: cardObj.cardNum,
            name: cardObj.name,
            imageName: cardObj.deckCardImage,
            count: "1",
            isEpic: cardObj.type[0] === '✦'
        }
        copyDeckList.push(parsedCard);
        setDeckList([...copyDeckList]);
    }

    const removeFromDeckList = (cardNum: string) => {
        console.log("context remove hit")
    }
    
    return (
        <DeckListContext.Provider 
            value={{
                deckList,
                addToDeckList,
                removeFromDeckList,
                forceRender,
                forceRenderDispatch
            }}
        >
            {children}
        </DeckListContext.Provider>
    );
  };
  