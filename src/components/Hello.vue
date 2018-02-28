<template>
  <section class="sign-container">
    <div class="signUp" v-if="showSignUp">
      <h1>Sign Up</h1>
      <input class="signUp__name" placeholder="Name" v-model="name" type="text">
      <input class="signUp__mail" placeholder="Email" v-model="email" type="text">
      <input class="signUp__password" placeholder="Password" v-model="password" type="password">
      <button class="button" @click="onSignup(email, password, name)" >SIGN UP</button>

      <p class="signUp__link">Already have an account ? <button @click="toggleSign()">Sign in</button></p>
    </div>

    <div class="signIn" v-if="!showSignUp">
      <h1>Sign In</h1>
      <input class="signUp__mail" placeholder="Email" v-model="email" type="text">
      <input class="signUp__password" placeholder="Password" v-model="password" type="password">    
      <button class="button" @click="onSignIn(email, password)" >SIGN IN</button>

      <p class="signIn__link">Don't have an account ? <button @click="toggleSign()">Sign Up</button></p>
    </div>

    <p class="error-message">{{ error }}</p>
  </section>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'
import router from '../router'
import notificationManager from './notificationManager'
export default {
  store,
  name: 'hello',
  data () {
    return {
      showSignUp: false,
      error: '',
      name: null,
      email: null,
      password: null
    }
  },
  mounted () {
    // console.log(store)
    notificationManager.start({requestSubscription: true})
    // notificationManager.requestSubscription()
    // notificationManager.test()

    this.signInOffline().then(() => {
      // console.log(this.$router.push({ path: 'latest' }))
    })
  },
  methods: { ...mapActions(['signUpUser', 'signInUser', 'signInOffline']),
    onSignup () {
      this.signUpUser({
        email: this.email,
        password: this.password,
        name: this.name
      }).then(user => {
        console.log('signed up', user)
        router.push({ path: 'latest' })
      }).catch(error => {
        console.log('sign up error', error)
        this.error = error.message
      })
    },
    onSignIn () {
      this.signInUser({
        email: this.email,
        password: this.password
      }).then(user => {
        console.log('signed in', user)
        router.push({ path: 'latest' })
      }).catch(error => {
        console.log('sign in error', error)
        this.error = error.message
      })
    },
    toggleSign () {
      this.email = null
      this.password = null
      this.showSignUp = !this.showSignUp
    }
  }
}
</script>

<style>

.error-message {
  color: red;
}

</style>
