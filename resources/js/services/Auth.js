import request from "../services/Request.js";
import store from "../stores/user";

const AuthService = {
  register: function(params) {
    let self = this;
    return new Promise(function(resolve, reject) {
      request({
        url: "/auth/register",
        method: "post",
        data: params
      })
        .then(function(response) {
          return resolve(response);
        })
        .catch(function(error) {
          let myError = {
            response: {
              message: error[0],
              status: 422
            }
          };
          return reject(myError);
        });
    });
  },
  login: function(params) {
    let self = this;
    return new Promise(function(resolve, reject) {
      request({
        url: "/auth/login",
        method: "post",
        data: params
      })
        .then(function(response) {
          if (response.data.access_token != undefined) {
            self.setLogin(response.data);
            self.getUserInfo();
          } else {
            return reject({
              response: {
                message: "Cannot get token from the server.",
                status: 500
              }
            });
          }
          return resolve(response);
        })
        .catch(function(error) {
          let myError = {
            response: {
              message: "Username or password is not matched.",
              status: 403
            }
          };
          return reject(myError);
        });
    });
  },

  setLogin(data) {
    localStorage.setItem('user', JSON.stringify(data))
  },

  getToken: function() {
    let user = localStorage.getItem('user')

    if (user == null) {
      return false
    }

    user = JSON.parse(user)

    return _.get(user, 'access_token', false)
  },

  isLogin: function() {
    if (!this.getToken()) {
      return false;
    }
    return true;
  },

  getUserInfo: function() {
    let self = this;
    return request({
      url: "/users/me",
      method: "get"
    })
      .then(response => {
        let user = response.data.data;
        if (user != undefined) {
          store.commit("userAuthenticated", user);
          AuthService.checkRefresh();
        }
      })
      .catch(() => {
        // store.commit("userLogout");
      });
  },

  logout: function() {
    store.commit("userLogout");
  }
};

export default AuthService;
