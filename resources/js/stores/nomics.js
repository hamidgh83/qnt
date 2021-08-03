import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currencies: []
    },
    mutations: {
        setCurrencies: (state, data) => {
            state.currencies = data;
        }
    },
    getters: {
        getCurrencies: state => {
            return state.currencies.map( item => {
                return item.currency
            })
        }
    }
});
