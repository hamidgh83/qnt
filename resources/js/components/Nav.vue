<template>
    <v-app-bar
      color="info accent-4"
      dense
      dark
    >
      <v-toolbar-title>{{ this.title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
        >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
          @click="logout()"
        >
          Logout
        </v-btn>
      </template>
    </v-menu>
      
    </v-app-bar>
</template>


<script>

import Auth from "../services/Auth";

export default {
    props  : [
        'title'
    ],
    data: () => ({
        
    }),
    mounted() {
        
    },
    methods: {
        logout() {
            Auth.logout()
            window.location.reload()
        }
    }
}
</script>
