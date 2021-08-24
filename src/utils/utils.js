export const isUserIdPresent = (array, id) =>
  array?.find((userId) => userId === id);

export const isUserPresent = (array, id) =>
  array?.find((user) => user._id === id);
