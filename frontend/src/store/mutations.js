import { cloneDeep } from 'lodash';
import * as types from './mutation-types';
import default_state from './state';

const findIndex = (arr, id) => arr.findIndex(obj => obj.id === id);

export default {
  [types.CLEAR_STATE](state) {
    const _state = cloneDeep(default_state);
    Object.keys(state).forEach(key => {
      state[key] = cloneDeep(_state[key]);
    });
  },

  [types.CONTEXT](state, context) {
    state.context = context;
  },
  [types.SNACKBAR](state, config) {
    state.snackbar = {
      visible: true,
      message: '',
      color: 'success',
      timeout: 3000,
      ...config
    };
  },

  [types.UNSET_ITEMS](state) {
    state.items = [];
  },

  [types.SET_ITEMS](state, items) {
    state.items = items;
  },

  [types.ITEMS_ADD](state, { items, item }) {
    const i = findIndex(items, item.id);
    items.splice(i !== -1 ? i : 0, i !== -1 ? 1 : 0, Object.assign((items[i] || {}), item));
  },

  [types.ITEMS_DEL](state, { items, item }) {
    const i = findIndex(items, item.id);
    items.splice(i, 1);
  },

  [types.NOTIFICATION](state, config) {
    state.notification = {
      visible: true,
      title: '',
      message: '',
      color: '#1976D2',
      ...config
    };
  }
};
