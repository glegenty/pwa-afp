<template>
  <div class="article">
    <img class="article__image" v-if="currentArticle.img" :src="currentArticle.img" />
    <h1 class="article__title" v-if="currentArticle.title">{{ currentArticle.title }}</h1>
    <h2 class="article__excerpt" v-if="currentArticle.excerpt">{{ currentArticle.excerpt }}</h2>
    <p class="article__description" v-if="currentArticle.description">{{ currentArticle.description }}</p>
  </div>
</template>

<script>
import store from '../store/store'
import router from '../router'

export default {
  store,
  data () {
    return {
      currentId: this.$route.params.id,
      currentArticle: {},
      articles: store.state.articles
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter', store.state.articles.length)
    if (store.state.articles.length === 0) {
      router.push({ path: 'latest' })
    } else {
      next()
    }
  },
  mounted () {
    this.currentArticle = store.state.articles[this.$route.params.id]
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="stylus">
.article__image
  height 300px
  transform: translateX(-20px)
</style>
