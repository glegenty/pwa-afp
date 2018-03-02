<template>
    <button class="btn-enable-bluetooth" @click="onClick">ENABLE BLUETOOTH</button>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'

export default {
  store,
  methods: { ...mapActions(['connectBluetooth']),
    onClick () {
      this.connectBluetooth()
    }
  }
}
</script>

<style lang="stylus">
.btn-enable-bluetooth 
  position relative
  width: 90%
  margin: 50px auto 0
  border: 2px solid #1483c7
  background white
  border-radius: 4px
  display flex
  align-items: center
  justify-content: center
  height: 50px
  color: #1483c7
</style>