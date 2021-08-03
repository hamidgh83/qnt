<template>
    <div>
        <nav-bar title="Dashboard" />
        
        <v-container>

            <v-card  class="mx-auto" max-width="400">
                <v-card-title class="text-h5">
                    Search for currencies
                </v-card-title>
                <v-card-text>
                    <v-autocomplete
                        v-model="currency"
                        :items="items"
                        dense
                        filled
                        label="Type a currency name"
                    ></v-autocomplete>
                    <v-btn 
                        :disabled="this.activeSearch"
                        large 
                        color="success" 
                        @click="getMarkets()"
                        >Search</v-btn>
                </v-card-text>
            </v-card>

            <market 
                v-if="this.marketItems.length > 0"
                :items=this.marketItems 
                :headers=this.headers />

        </v-container>
    </div>
</template>

<script>
import Nomics from "../services/Nomics";
import Market from "./Market.vue";
import NavBar from "./Nav.vue";
import store from "../stores/nomics";

export default {
    components: {
        'market': Market,
        'nav-bar': NavBar
    },
    data: () => ({
      currency: null,
      markets: [],
      headers: [
          {
            text: 'exchange',
            align: 'start',
            sortable: false,
            value: 'exchange',
          },
          { text: 'market', value: 'market' },
          { text: 'quote', value: 'quote' }
        ]
    }),
    mounted() {
        Nomics.getCurrencies().then(response => {
            store.commit("setCurrencies", response)
        })
    },
    computed: {
        items() {
            return store.getters.getCurrencies
        },
        marketItems() {
            return this.markets
        },
        activeSearch() {
            return this.currency != null ? false : true
        }
    },
    methods: {
        getMarkets() {
            Nomics.getMarkets(this.currency).then(response => {
                this.markets = response
            })
        }
    }
}
</script>
