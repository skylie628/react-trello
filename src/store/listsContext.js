import { createContext } from "react";
const initialValue = {
  columns: [],
  lists: {},
};
export const listsContext = createContext(initialValue);
