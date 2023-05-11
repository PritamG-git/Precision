export const getUser = (state) => {
  return Object.keys(state.user).length > 0 ? state.user : null;
};
export const geterror= (state) => {
  return Object.keys(state.user).length > 0 ? state.user : state.user;
};