<template>
  <section class="sign-container">
    <div class="signUp" v-if="showSignUp">
      <h1>Sign Up</h1>
      <input class="signUp__name signUp__input" placeholder="Name" v-model="name" type="text">
      <input class="signUp__mail signUp__input" placeholder="Email" v-model="email" type="email">
      <input class="signUp__password signUp__input" placeholder="Password" v-model="password" type="password">
      <button class="signUp__button" @click="onSignup(email, password, name)" >SIGN UP</button>

      <p class="signUp__link">Already have an account ? <button @click="toggleSign()">Sign in</button></p>
    </div>

    <div class="signIn" v-if="!showSignUp">
      <h1>Sign In</h1>
      <input class="signUp__mail signUp__input" placeholder="Email" v-model="email" type="email">
      <input class="signUp__password signUp__input" placeholder="Password" v-model="password" type="password">    
      <button class="signUp__button" @click="onSignIn(email, password)" >SIGN IN</button>

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
      console.log(this.$router.push({ path: 'latest' }))
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

<style lang="stylus">

.error-message {
  color: red;
}

.sign-container
  // padding 0 20px
  color #1483c7
.signUp__input
  display block
  outline: none
  background-color none
  border none
  width 80vw
  height 40px
  text-align center
  border solid 1px #1483c7
  color #1483c7
  border-radius 3px
  box-sizing border-box
  font-size 20px
  margin 20px auto 0 
  
.signUp__button
  border solid 1px #1483c7
  background #1483c7
  color #FFF
  border-radius 40px
  width 80vw
  height 40px
  margin 20px auto 0 
  font-size 20px
  display block
  // background transparent
.signIn__link, .signUp__link
  position absolute
  bottom 0
  width: 100%
  button 
    -webkit-appearance none
    appearance none
    background #fff
    border none
    color: #1483c7
    border-radius: 3px
    border: 1px solid #1483c7
    min-height: 20px
    margin-left 10px
    
   
input:-webkit-autofill
  // background-color none !important
  -webkit-box-shadow: 0 0 0 30px white inset;
  -webkit-text-fill-color: #1483c7
  color #1483c7

::-webkit-input-placeholder
  color #1483c7
</style>
