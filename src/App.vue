<template>
  <div id="app">
    <header>
      <span>AFP NEWS</span>
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
      TweenMax.fromTo(el, 0.5, {autoAlpha: 0, x: -5}, {autoAlpha: 1, x: 0, ease: Power4.easeOut, onComplete: () => done()})
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
      TweenMax.to(el, 0.5, {autoAlpha: 0, x: -5, ease: Power4.easeOut, onComplete: () => done()})

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
main
  padding 0 20px
  padding-top 50px
  padding-bottom 20px
  overflow-x hidden
header
  width 100vw
  height 50px
  background #FFF
  position fixed
  top 0
  text-align center
  letter-spacing: 10px;
  // border-bottom: solid 1px black
  box-shadow: 0px 2px 10px 5px rgba(0,0,0,0.1);
  display flex
  align-items center
  justify-content center
  z-index 10
#app 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
// .page-name
//   position fixed

</style>
