const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((player) =>
          player.id === action.payload.id ? action.payload : player
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
