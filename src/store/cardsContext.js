import { createContext } from "react";
const initialValue = {
  cards: {},
};
export const cardsContext = createContext(initialValue);
