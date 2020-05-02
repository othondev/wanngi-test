<template>
<div id="app">
  <v-app id="inspire">
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="500"
        persistent
      >

        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Login
          </v-card-title>
  
        <v-form class="main"
          ref="form"
          v-model="valid">

          <v-text-field
            v-model="login"
            :rules="[v => !!v || 'Item is required']"
            label="Login"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            :rules="[v => !!v || 'Item is required']"
            v-model="password"
            label="Password"
            required
          ></v-text-field>
          
          <v-btn class="mr-4" @click="submit">Submit</v-btn>
          <v-btn @click="clear">Clear</v-btn>
        </v-form>
  
          <v-divider></v-divider>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</div>
</template>

<script>
import { eventBus } from '@/main.js'

export default {
  name: 'LoginDialog',
  data: () => ({
      login:'',
      password: '',
      dialog:{},
      showPwd: false,
      valid: false,
  }),
  methods:{
    submit(){
        if(this.$refs.form.validate()){
          const user = {
            login: this.login,
            password: this.password
          }
          eventBus.login(user)
        }
        
    },
    clear(){
      this.login = ""
      this.password = ""
    }
  }
}
</script>
<style scoped>
.main {
  margin: 10px
}
</style>