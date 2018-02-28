<template>
  <div class="search">
    <h1>Search</h1>
    <input class="search__input" v-model="keywords" placeholder="Search" type="text" @focus="onFocus()">
    <button class="button" @click="onSearch()">Search</button>

    <p class="error" v-if="this.error">No matching news, sorry ¯\_(ツ)_/¯</p>
    
    <div class="results" v-if="this.articles.length">
      <h2 class="results__title">Results for <i>{{ keywords }}</i></h2>
      <ul class="results__news">
          <li class="news" v-for='article in this.articles'>
            <!-- <div class="news__container" @click="openArticle(article.id)"> -->
              
            <img v-if="article.entity_video !== 'yes'" class="news__img" :src="article.img" alt="news img">
            <video controls v-if="article.entity_video === 'yes'" class="news__img" :src="article.img"></video>

              <router-link :to="{path: '/latest/'+article.id}"><h2 class="news__title">{{ article.title }}</h2></router-link>
              <h2 class="news__excerpt">{{ article.excerpt }}</h2>
              <!-- <h2 class="news__description">{{ article.description }}</h2> -->
            <!-- </div> -->
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'

export default {
  store,
  data () {
    return {
      keywords: '',
      articles: [],
      error: false
    }
  },
  methods: { ...mapActions(['getSearchedNews', 'getArticleData']),
    onSearch () {
      this.getSearchedNews({keywords: this.keywords}).then(results => {
        console.log(results.body.response)

        if (results.body.response && results.body.response.docs) {
          this.error = false
          let searchedArticles = results.body.response.docs
          for (let i = 0, l = searchedArticles.length; i < l; i++) {
            this.getArticleData({article: searchedArticles[i]}).then((result) => {
              let article = result
              article.id = this.articles.length
              this.articles.push(article)
            })
          }
        } else {
          this.error = true
        }
      })
    },
    onFocus () {
      this.articles = []
    }
  }
}
</script>

<style>
</style>