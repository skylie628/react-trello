import actions from "../action";

export const cardsReducer = (cardState, { type, payload }) => {
  switch (type) {
    case actions.ADD_CARD:
      return payload;
    case actions.UPDATE_CARD:
      return payload;
    case actions.REMOVE_CARD:
      return payload;
    case actions.REMOVE_MULTIPLE_CARDS:
      return payload;
    case actions.CHANGE_CARD_POSITION:
      return payload;
  }
};
