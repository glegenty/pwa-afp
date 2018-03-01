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
      previousRoute: null
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Latest' && store.state.articles.length === 0) {
      router.push({ path: 'latest' })
    } if (from.name === 'Search' && store.state.search.articles.length === 0) {
      router.push({ path: 'search' })
    } else {
      store.state.previousRoute = from
      next()
    }
  },
  mounted () {
    window.scrollTo(0, 0)

    switch (store.state.previousRoute.name) {
      case 'Latest':
        this.currentArticle = store.state.articles[this.currentId]
        break
      case 'Search':
        this.currentArticle = store.state.search.articles[this.currentId]
        break
      default:
        console.error('Error reading current article, redirecting.')
        router.push({ path: 'latest' })
        break
    }
  }
}
</script>

<style lang="stylus">
.article
  position relative

.article__image
  position relative
  height 300px
  left: 50%
  transform: translateX(-50%)
  transform-origin: center center 
</style>
