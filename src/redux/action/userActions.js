export const addUser = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const addUsers = (users) => ({
  type: "ADD_USERS",
  payload: users,
});

export const updateUser = (user) => ({
  type: "UPDATE_USER",
  payload: user,
});
