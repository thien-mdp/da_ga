export const addPlayer = (player) => ({
    type: 'ADD_PLAYER',
    payload: player,
});

export const updatePlayer = (player) => ({
    type: 'UPDATE_PLAYER',
    payload: player,
});

export const deletePlayer = (playerId) => ({
    type: 'DELETE_PLAYER',
    payload: playerId,
});

