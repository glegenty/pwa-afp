<template>
  <div class="latest">
    <h1>Latest News</h1>
    <ul class="news-container">
        <li class="news" v-for='article in this.articles'>
          <!-- <div class="news__container" @click="openArticle(article.id)"> -->
            
            <img v-if="article.entity_video !== 'yes'" class="news__img" :src="article.img" alt="news img">
            <video controls v-if="article.entity_video === 'yes'" class="news__img" :src="article.img"></video>

            <router-link :to="{path: '/latest/'+article.id}"><h2 class="news__title">{{ article.title }}</h2></router-link>
            <h2 class="news__excerpt">{{ article.excerpt }}</h2>
          <!-- </div> -->
        </li>
    </ul>
  </div>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'

export default {
  store,
  name: 'latest',
  methods: { ...mapActions(['getLatestNews', 'getUnsplashImage', 'getArticleData']) },
  data () {
    return {
      news: {},
      articles: store.state.articles
    }
  },
  mounted () {
    if (this.articles.length > 0) {
      return false
    }

    this.getLatestNews().then(result => {
      let latestArticles = result.body.response.docs

      for (let i = 0, l = latestArticles.length; i < l; i++) {
        this.getArticleData({article: latestArticles[i]}).then((result) => {
          let article = result
          article.id = this.articles.length
          this.articles.push(article)
        })
      }
    }).catch(error => console.log(error))
  }
}
</script>

<style lang="stylus">

.news 
  text-align: left;
  // background #000
  border-radius 4px
  box-shadow: 0px 2px 10px 5px rgba(0, 0, 0, 0.1);
  padding-bottom 15px
  margin-top 20px

.news__title 
  font-size: 16px;
  padding: 0 15px


.news__excerpt 
  font-size: 10px;
  padding: 0 15px

.news__description 
  font-size: 6px;
  
.news__img 
  width: 100%;
  border-radius 4px 4px 0 0;


// .news-container
//     padding 0 20px

</style>
