<template>
      <v-container>
        <v-layout wrap>
          <v-flex sm12 md6 offset-md3 >
            <v-card elevation="4" light tag="section">
              <v-card-title>
                <v-layout align-center justify-space-between>
                  <h3 class="headline">
                    Register
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
                                label="Name"
                                :rules="rules.name"
                                hide-details="auto"
                                v-model="form.name"></v-text-field>
                  <v-text-field
                                label="Email"
                                :rules="rules.email"
                                hide-details="auto"
                                v-model="form.email"></v-text-field>
                  <v-text-field
                                label="Password"
                                :rules="rules.password"
                                hide-details="auto"
                                type="password"
                                v-model="form.password"></v-text-field>
                  <v-text-field
                                label="Confirm password"
                                :rules="[
                                  value => !!value || 'Type confirm password',
                                  value => (value == this.form.password) || 'The password confirmation does not match',
                                ]"
                                hide-details="auto"
                                type="password"
                                v-model="form.confirm_password"></v-text-field>
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
                  to="/"
                >
                  Already have an account?
                </router-link>
                <v-spacer></v-spacer>
                <v-btn color="info" :large="$vuetify.breakpoint.smAndUp" @click="registerUser">
                  Register
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import Auth from "../services/Auth";
import _ from "lodash";

export default {
    data: () => ({
      error: "",
      validForm: false,
      form: {
        name: "",
        email: "",
        password: "",
        confirm_password: ""
      },

      rules: {
        name: [
          value => !!value || 'This field is required',
          value => (value && value.length >= 3) || 'Min 3 characters',
        ],
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
        registerUser() {
            if (!this.$refs.form.validate()) {
              return;
            }

            let result = Auth.register(this.form);
            result
              .then(response => {
                this.error = ""
                this.$router.push({ name: "login" });
              })
              .catch(error => {
                this.error = error.response.message
              });
        }
    },
    computed: {
      hasError() {
        // return requestStore.getters.hasError
      },
      getError() {
        // return requestStore.getters.errorMessage
      }
    },
}
</script>
