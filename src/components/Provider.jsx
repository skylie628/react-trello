//hook
import { useReducer } from "react";
//action
import actions from "../action";
//reducer
import { listsReducer } from "../reducer/listsReducer";
import { cardsReducer } from "../reducer/cardsReducer";
//context
import { cardsContext } from "../store/cardsContext";
import { listsContext } from "../store/listsContext";
export default function Provider({ children }) {
  const [cardsState, dispatchCards] = useReducer(cardsReducer, {
    cards: {},
  });
  const [listsState, dispatchLists] = useReducer(listsReducer, {
    columns: [],
    lists: {},
  });
  const addList = ({ list }) => {
    //add new collection to cardLists  reducer
    dispatchLists({
      type: actions.ADD_LIST,
      payload: {
        columns: [...listsState.columns, list.id],
        lists: {
          ...listsState.lists,
          [list.id]: list,
        },
      },
    });
  };
  // remove list
  const removeList = ({ id }) => {
    //remove list
    const columnsWithoutRemovedItem = listsState.columns.filter(
      (listId) => listId !== id
    );
    //remove cards belong to that list
    //remove list
    const clonedLists = { ...listsState.lists };
    delete clonedLists[id];
    dispatchLists({
      type: actions.REMOVE_LIST,
      payload: {
        ...listsState,
        columns: columnsWithoutRemovedItem,
        lists: clonedLists,
      },
    });
    //remove cards belong to that list
    removeMultipleCards({ listId: id, cardIds: clonedLists[id].cards });
  };
  // update list
  const updateList = ({ updatedList }) => {
    dispatchLists({
      type: actions.UPDATE_LIST,
      payload: {
        ...listsState,
        lists: {
          ...listsState.lists,
          [updatedList.id]: updatedList,
        },
      },
    });
  };
  const addCard = ({ listId, card }) => {
    //add new card to cards reducer
    dispatchCards({
      type: actions.ADD_CARD,
      payload: {
        ...cardsState,
        cards: { ...cardsState.cards, [card.id]: card },
      },
    });
    // update list store with new card added

    const newListwithAddedCard = {
      ...listsState.lists[listId],
      cards: [...listsState.lists[listId].cards, card.id],
    };
    updateList({ updatedList: newListwithAddedCard });
  };
  const removeMultipleCards = ({ listId, cardIds }) => {
    //remove card from card store
    const cardsWithoutRemovedItems = cardsState.filter(
      (card) => !cardIds.includes(card.id)
    );
    dispatchCards({
      type: actions.REMOVE_CARD,
      payload: {
        ...cardsState,
        cards: cardsWithoutRemovedItems,
      },
    });
    //remove card from list store
    const clonedLists = { ...listsState.lists };
    const newListsWithoutRemovedCard = clonedLists[listId].filter(
      (cardId) => !cardIds.includes(cardId)
    );
    updateList({ updatedList: newListsWithoutRemovedCard });
  };
  const removeCard = ({ listId, id }) => {
    //remove card from card store
    const cardsWithoutRemovedItem = { ...cardsState.cards };
    delete cardsWithoutRemovedItem[id];
    console.log("cardsWithoutRemovedItem", cardsWithoutRemovedItem, listId);
    dispatchCards({
      type: actions.REMOVE_CARD,
      payload: {
        ...cardsState,
        cards: cardsWithoutRemovedItem,
      },
    });
    //remove card from list store
    const clonedLists = JSON.parse(JSON.stringify(listsState.lists));
    const newListsWithoutRemovedCard = {
      ...clonedLists[listId],
      cards: clonedLists[listId].cards.filter((cardId) => cardId !== id),
    };
    updateList({ updatedList: newListsWithoutRemovedCard });
  };

  const updateCard = (updatedCard) => {
    dispatchCards({
      type: actions.UPDATE_CARD,
      payload: {
        ...cardsState,
        cards: {
          ...cardsState.cards,
          [updatedCard.id]: updatedCard,
        },
      },
    });
  };

  const moveCard = ({ fromListId, toListId, cardId, index }) => {
    const clonedLists = JSON.parse(JSON.stringify(listsState.lists));
    const fromList = clonedLists[fromListId];
    const toList = clonedLists[toListId];
    const cardToMove = fromList.cards.filter((card) => card.id === cardId)[0];
    fromList.cards.splice(fromList.cards.indexOf(cardToMove), 1);
    toList.cards.splice(index, 0, cardToMove);
    updateList({ updatedList: fromList });
    updateList({ updatedList: toList });
  };
  return (
    <listsContext.Provider
      value={{ ...listsState, addList, removeList, updateList }}
    >
      <cardsContext.Provider
        value={{
          ...cardsState,
          addCard,
          removeCard,
          updateCard,
          moveCard,
        }}
      >
        {children}
      </cardsContext.Provider>
    </listsContext.Provider>
  );
}
