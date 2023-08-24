import $http from '@Config/axios';
import $store from '@Store';

const prefix = 'user';
const type = 'User';

export default {
  index() {
    return new Promise((resolve, reject) => {
      $http.get(`${prefix}/users`)
        .then(response => resolve(response))
        .catch(response => reject(response));
    });
  },
  show(id) {
    return new Promise((resolve, reject) => {
      $http.get(`${prefix}/${id}`)
        .then(response => resolve({
          id: response.id,
          usuario: response.usuario,
          configuracoes: response.configuracoes
        }))
        .catch(response => reject(response));
    });
  },
  store(params) {
    return new Promise((resolve, reject) => {
      $http.post(`${prefix}/new-user`, params)
        .then(response => {
            $store.dispatch('SHOW_SNACKBAR', {
                message: 'Registration completed successfully! Please log in.'
            });
          resolve(response);
        })
        .catch(response => reject(response));
    });
  },
  update(params) {
    return new Promise((resolve, reject) => {
      $http.put(prefix, params)
        .then(response => {
          $store.dispatch('SHOW_SNACKBAR', {
            message: `${type} updated successfully!`
          });
          resolve(response);
        })
        .catch(response => reject(response));
    });
  },
  loginUser(params) {
    return new Promise((resolve, reject) => {
      $http.post(`${prefix}/login`, params)
        .then(async response => {
          resolve(response);
        })
        .catch(response => reject(response));
    });
  }
};
