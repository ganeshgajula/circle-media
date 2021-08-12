export const isUserPresent = (array, id) =>
  array.find((user) => user?._id === id);
