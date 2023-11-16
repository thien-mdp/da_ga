const initialState = {
  status: "",
  message: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DISPATCH_MESSAGE":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_MESSAGE":
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};

export default messageReducer;
