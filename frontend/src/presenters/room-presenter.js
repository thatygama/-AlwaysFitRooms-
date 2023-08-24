import $http from '@Config/axios';
import $store from '@Store';

const prefix = 'room';
const type = 'Room';

export default {
  index() {
    return new Promise((resolve, reject) => {
      $http.get(`${prefix}/rooms`)
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
      $http.post(`${prefix}/new-room`, params)
        .then(response => {
            $store.dispatch('SHOW_SNACKBAR', {
                message: 'Registration completed successfully!'
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
  }
};
