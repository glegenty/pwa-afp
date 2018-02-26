<template>
  <div class="latest">
    <h1>Latest News</h1>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  store,
  name: 'latest',
  mounted () {
    console.log('latest', this)
  },
  methods: {}
}
</script>

<style>

</style>
