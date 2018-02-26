<template>
  <div class="signUp">
    <input v-model="name" class="name" type="text">
    <input v-model="email" class="mail" type="text">
    <input v-model="password" class="password" type="password">    
    <button @click="onSignup(email, password, name)" >SIGN UP</button>
  </div>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'
export default {
  store,
  name: 'hello',
  data () {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  mounted () {
    this.getLatestNews()
  },
  methods: { ...mapActions(['signUpUser', 'getLatestNews']),
    onSignup () {
      this.signUpUser({email: this.email, password: this.password, name: this.name})
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
