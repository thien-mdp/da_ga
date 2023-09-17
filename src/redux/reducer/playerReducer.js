const initialState = {
    players: [],
};

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PLAYER':
            return {
                ...state,
                players: [...state.players, action.payload],
            };
        case 'UPDATE_PLAYER':
            return {
                ...state,
                players: state.players.map((player) =>
                    player.id === action.payload.id ? action.payload : player
                ),
            };
        case 'DELETE_PLAYER':
            return {
                ...state,
                players: state.players.filter(
                    (player) => player.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

export default playerReducer;