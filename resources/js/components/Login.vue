<template>
    
      <v-container>
        <v-layout wrap>
          <v-flex sm12 md6 offset-md3 >
            <v-card elevation="4" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <h3 class="headline">
                    Login
                  </h3>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-form
                    ref="form"
                    v-model="validForm"
                    lazy-validation
                  >
                  <v-text-field
                                outline
                                label="Email"
                                :rules="rules.email"
                                type="text"
                                v-model="form.email"></v-text-field>
                  <v-text-field
                                outline
                                hide-details
                                :rules="rules.password"
                                label="Password"
                                type="password"
                                v-model="form.password"></v-text-field>
                </v-form>

                <v-alert
                  border="left"
                  colored-border
                  color="red accent-4"
                  elevation="2"
                  v-if="this.error.length > 0"
                >
                  {{this.error}}
                </v-alert>

              </v-card-text>
              <v-card-actions :class="{ 'pa-3': $vuetify.breakpoint.smAndUp }">

                <router-link
                  to="/register"
                >
                  Don't have account yet?
                </router-link>
                <v-spacer></v-spacer>
                <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" @click="login">
                  Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    
</template>

<script>
import Auth from "../services/Auth";

export default {
    data: () => ({
      error: "",
      validForm: false,
      form: {
        email: "",
        password: ""
      },

      rules: {
        email: [
          value => !!value || 'This field is required',
          value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Invalid email format',
        ],
        password: [
          value => !!value || 'This field is required',
          value => (value && value.length >= 5) || 'Min 5 characters',
        ]
      },
    }),
    methods: {
        login() {
            if (!this.$refs.form.validate()) {
              return
            }

            let result = Auth.login(this.form);
            result
              .then(response => {
                this.$router.push({ name: "dashboard" });
              })
              .catch(error => {
                this.error = error.response.message
              });
        }
    }
}
</script>
