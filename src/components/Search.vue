<template>
  <div class="search">
    <h1>Search</h1>
    <input class="search__input" v-model="keywords" ref="search__input" placeholder="Type here to search" type="text" @keydown="onKeydown()">
    <!-- <button class="button" @click="onSearch()">Search</button> -->

    <p class="error" v-if="this.error">No matching news, sorry ¯\_(ツ)_/¯</p>
    
    <div class="results" v-if="this.articles.length">
      <h2 class="results__title">Results for <i>{{ keywords }}</i></h2>
      <ul class="results__news">
        <article-card v-for='article in this.articles' :article="article"/>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'
import ArticleCard from './Card'

export default {
  store,
  components: {
    ArticleCard
  },
  data () {
    return {
      error: false,
      keywords: store.state.search.keywords,
      articles: store.state.search.articles
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.search__input.focus()
    }, 500)
  },
  methods: { ...mapActions(['getSearchedNews', 'getArticleData']),
    onKeydown () {
      this.$nextTick(() => {
        this.getSearchedNews({keywords: this.keywords}).then(results => {
          if (results.body.response && results.body.response.docs) {
            this.articles = []
            store.state.search.articles = []
            this.error = false

            let searchedArticles = results.body.response.docs
            for (let i = 0, l = searchedArticles.length; i < l; i++) {
              this.getArticleData({article: searchedArticles[i]}).then((result) => {
                let article = result
                article.id = this.articles.length
                this.articles.push(article)
              })
            }

            store.state.search.articles = this.articles
            store.state.search.keywords = this.keywords
          } else {
            this.error = true
            this.articles = []
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus">
.search__input
  -webkit-appearance none
  border none
  width calc(100% - 10px)
  height: 40px
  background #fefefe
  text-transform uppercase
  padding-left: 10px
  border-radius: 2px
  outline: none
  border: 1px solid #1D1D1D
  &:focus
    outline: none
    outline-offset: initial
    color: #1483c7
    border: 1px solid #1483c7
</style>