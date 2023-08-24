export const context = state => state.context;
export const snackbar = state => state.snackbar;
export const notification = state => state.notification;
export const user = state => (state.context || {}).user;

export const items = state => state.items.map(item => {
  const obj = {
    ...item
  };
  return obj;
});
