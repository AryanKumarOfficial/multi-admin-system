export const ADD_TO_LIST = (item) => {
  return {
    type: "ADD_TO_LIST",
    payload: item,
  };
};

export const REMOVE_FROM_LIST = (item) => {
  return {
    type: "REMOVE_FROM_LIST",
    payload: item,
  };
};
