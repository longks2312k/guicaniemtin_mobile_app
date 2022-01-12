const initialState = {
  items: [],
};

export default function sharesReducer(state = initialState, action) {
  switch (action.type) {
    case 'REMOVE_SHARES':
      return {
        items: action.data,
      };
    case 'CLEAR_LOGIN':
      return {
        items: [],
      };
    default:
      return state;
  }
}
