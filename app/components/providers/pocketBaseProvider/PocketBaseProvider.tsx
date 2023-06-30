import {
  FC,
  PropsWithChildren,
  createContext,
  useState,
} from "react";
import PocketBase from 'pocketbase';

export const PocketBaseContext = createContext<PocketBase | undefined>(
  undefined
);

export const PocketBaseProvider: FC<PropsWithChildren> = ({ children }) => {
  const [pb, setPb] = useState<PocketBase>(
    new PocketBase('https://grotto-beasts-test.fly.dev')
  );

  return (
    <PocketBaseContext.Provider value={pb}>
      {children}
    </PocketBaseContext.Provider>
  );
};
