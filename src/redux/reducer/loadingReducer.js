const initialState = {
  isLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default loadingReducer;
