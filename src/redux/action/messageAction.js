export const dispatchMessage = (message) => ({
  type: "DISPATCH_MESSAGE",
  payload: message,
});

export const resetMessage = () => ({
  type: "RESET_MESSAGE",
});
