import axios from "axios";
import store from "../stores/user";
import Vue from "vue";
import _ from "lodash";

const service = axios.create({
  timeout: 5000, // Maximum timeout is 5s
  baseURL: process.env.MIX_API_URL
});

service.interceptors.request.use(config => {
  store.commit("handleLoading", true);
  // config.headers.common['Access-Control-Allow-Origin'] = '*';

  return config;
});

service.interceptors.response.use(
  response => {
    store.commit("handleLoading", false);
    store.commit("requestSuccess");
    
    return response.data;
  },
  error => {
    store.commit("handleLoading", false);

    let status = _.get(error, 'response.status');
    status = status != undefined ? status : 500;
    let code = Number(String(status).charAt(0));
    let errors = _.get(error, 'response.data.errors');
    errors = errors == undefined ? ["Unknown error!"] : errors;

    /* Present HTTP errors */
    switch (code) {
      case 3:
        Vue.prototype.$message.warn(errors);
        break;
      case 4:
        if (status == 422) {
          return Promise.reject(errors[Object.keys(errors)[0]]);
        }
        break;
      
    }

    return Promise.reject(error);
  }
);

export default service;
