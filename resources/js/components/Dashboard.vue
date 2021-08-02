<template>
    <v-container>
        <v-card color="black lighten-2" dark>
            <v-card-title class="text-h5 grey darken-3">
                Search for currencies
            </v-card-title>
            <v-card-text>
                <v-card-text>
                    <v-autocomplete
                        v-model="value"
                        :items="items"
                        dense
                        filled
                        label="Type a currency name"
                    ></v-autocomplete>
                </v-card-text>
            </v-card-text>
        </v-card>
      </v-container>
</template>

<script>
import Nomics from "../services/Nomics";
import store from "../stores/nomics";

export default {
    data: () => ({
    //   items: ['foo', 'bar', 'fizz', 'buzz'],
      values: ['foo', 'bar'],
      value: null,
    }),
    mounted() {
        Nomics.getCurrencies().then(response => {
            store.commit("setCurrencies", response)
        })
    },
    computed: {
        items() {
            return store.state.currencies
        }
    }
}
</script>
