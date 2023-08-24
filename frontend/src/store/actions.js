import * as types from './mutation-types';

export const CLEAR_STATE = ({ commit }) => commit(types.CLEAR_STATE);
export const CONTEXT = ({ commit }, context) => commit(types.CONTEXT, context);

export const SHOW_SNACKBAR = ({ commit }, config) => commit(types.SNACKBAR, config);
export const HIDE_SNACKBAR = ({ commit }) => commit(types.SNACKBAR, { visible: false });

export const SET_ITEMS = ({ commit }, items) => commit(types.SET_ITEMS, items);
export const UNSET_ITEMS = ({ commit }) => commit(types.UNSET_ITEMS);
export const ITEMS_ADD = ({ commit, state }, item) => commit(types.ITEMS_ADD, { items: state.items, item });
export const ITEMS_DEL = ({ commit, state }, item) => commit(types.ITEMS_DEL, { items: state.items, item });

export const SHOW_NOTIFICATION = ({ commit }, config) => commit(types.NOTIFICATION, config);
export const HIDE_NOTIFICATION = ({ commit }) => commit(types.NOTIFICATION, { visible: false });
