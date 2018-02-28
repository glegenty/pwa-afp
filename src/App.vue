<template>
  <div id="app">
    <header>
      <span>Vue.js PWA</span>
    </header>
    <main>
      <transition mode="out-in"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
      >
        <router-view></router-view>
      </transition>
    </main>
  </div>
</template>

<script>

import { TweenMax, Power4 } from 'gsap'
export default {
  name: 'app',
  methods: {
    beforeEnter: function (el) {
    // ...
    },
    // la fonction de rappel done est facultative quand
    // utilisée en combinaison avec du CSS
    enter: function (el, done) {
      console.log(el)
      TweenMax.fromTo(el, 1, {autoAlpha: 0, x: -5}, {autoAlpha: 1, x: 0, ease: Power4.easeOut, onComplete: () => done()})
    },
    afterEnter: function (el) {
    // ...
    },
    enterCancelled: function (el) {
    // ...
    },

    // ----------
    // EN SORTANT
    // ----------

    beforeLeave: function (el) {
    // ...
    },
    // la fonction de rappel done est facultative quand
    // utilisée en combinaison avec du CSS
    leave: function (el, done) {
      console.log(el)
      TweenMax.to(el, 1, {autoAlpha: 0, x: -5, ease: Power4.easeOut, onComplete: () => done()})

      // done()
    },
    afterLeave: function (el) {
    // ...
    },
    // leaveCancelled est uniquement disponible avec v-show
    leaveCancelled: function (el) {
    // ...
    }
  }
}
</script>

<style lang="stylus">
body, ul 
  margin: 0;
  padding: 0;
  list-style-type: none;

a
  text-decoration:none
  color: inherit
#app
  padding 0 20px
header
//  &:before
//     position absolute
//     content: ''
//     background-image: linear-gradient(180deg, #a1c4fd 0%, #c2e9fb 100%);
//     height: 200px;
//     width 100vw
//     z-index -1
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;


</style>
