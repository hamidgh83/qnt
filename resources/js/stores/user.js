import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/Auth.js";
import router from '../router.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isLogin: null
  },
  mutations: {
    handleLoading: state => {},
    setMessage: (state, data) => {
      state.messages.push({ message: data.message, status: data.status });
    },
    setUser: state => {},
    userAuthenticated: (state, data) => {
      state.isLogin = true;
      state.user = data;
    },
    userLogout: state => {
      localStorage.removeItem("token");
      state.isLogin = false;
      state.user = {};
      router.push("login")
    },
    getUserInfo: state => {
      AuthService.getUserInfo();
    }
  },
  getters: {}
});
