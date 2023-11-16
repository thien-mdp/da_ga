export const addTable = (table) => ({
  type: "ADD_TABLE",
  payload: table,
});

export const addTables = (tables) => ({
  type: "ADD_TABLES",
  payload: tables,
});

export const updateTable = (table) => ({
  type: "UPDATE_TABLE",
  payload: table,
});

export const deleteTable = (tableId) => ({
  type: "DELETE_TABLE",
  payload: tableId,
});
