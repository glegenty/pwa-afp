<template>
  <div class="search">
    <input class="search__input" v-model="keywords" placeholder="Search" type="text">
    <button class="button" @click="onSearch()" >Search</button>
  </div>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'

export default {
  store,
  data () {
    return {
      keywords: ''
    }
  },
  methods: { ...mapActions(['getSearchedNews']),
    onSearch () {
      this.getSearchedNews({keywords: this.keywords}).then(result => {
        console.log(result)
      })
    }
  }
}
</script>

<style>
</style>