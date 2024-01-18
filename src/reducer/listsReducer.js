import actions from "../action";

export const listsReducer = (listsState, { type, payload }) => {
  switch (type) {
    case actions.ADD_LIST:
      return payload;
    case actions.UPDATE_LIST:
      return payload;
    case actions.REMOVE_LIST:
      return payload;
    case actions.CHANGE_LIST_POSITION:
      return payload;
  }
};
