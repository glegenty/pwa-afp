<template>
  <div id="app">
    <header>
      <span @click="onBack" class="btn-back">
        <svg class="svg-icon" viewBox="0 0 20 20">
          <path fill="none" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
        </svg>
      </span>

      <span><router-link to="/latest">NEWS</router-link></span>

      <router-link to="/search" class="btn-search">
        <svg class="svg-icon" viewBox="0 0 20 20">
          <path fill="none" d="M18.109,17.776l-3.082-3.081c-0.059-0.059-0.135-0.077-0.211-0.087c1.373-1.38,2.221-3.28,2.221-5.379c0-4.212-3.414-7.626-7.625-7.626c-4.212,0-7.626,3.414-7.626,7.626s3.414,7.627,7.626,7.627c1.918,0,3.665-0.713,5.004-1.882c0.006,0.085,0.033,0.17,0.098,0.234l3.082,3.081c0.143,0.142,0.371,0.142,0.514,0C18.25,18.148,18.25,17.918,18.109,17.776zM9.412,16.13c-3.811,0-6.9-3.089-6.9-6.9c0-3.81,3.089-6.899,6.9-6.899c3.811,0,6.901,3.09,6.901,6.899C16.312,13.041,13.223,16.13,9.412,16.13z"></path>
        </svg>
      </router-link>
      
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
    },
    onBack () {
      console.log(this)
      this.$router.go(-1)
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

.btn-back, .btn-search
  position absolute 
  display flex
  svg 
    width: 22px
    height: 22px
    path
      fill: #1D1D1D

.btn-back
  left 15px

.btn-search
  right 15px

</style>
