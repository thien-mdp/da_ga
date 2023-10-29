const initialState = {
  tables: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TABLE":
      return {
        ...state,
        tables: [...state.tables, action.payload],
      };
    case "UPDATE_TABLE":
      return {
        ...state,
        tables: state.tables.map((player) =>
          player.id === action.payload.id ? action.payload : player
        ),
      };
    case "DELETE_TABLE":
      return {
        ...state,
        tables: state.tables.filter((player) => player.id !== action.payload),
      };
    default:
      return state;
  }
};

export default playerReducer;
