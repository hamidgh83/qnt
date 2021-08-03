import Vue from "vue";
import Vuex from "vuex";
import AuthService from "../services/Auth.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    isLogin: null,
    loading: false
  },
  mutations: {
    handleLoading: (state, data) => {
      state.loading = data
    },
    setMessage: (state, data) => {
      state.messages.push({ message: data.message, status: data.status });
    },
    setUser: state => {},
    userAuthenticated: (state, data) => {
      state.isLogin = true;
      state.user = data;
    },
    userLogout: state => {
      localStorage.removeItem("user");
      state.isLogin = false
      state.user = {}
    },
    getUserInfo: state => {
      AuthService.getUserInfo();
    }
  },
  getters: {}
});
