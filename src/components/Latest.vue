<template>
  <div class="latest">
    <!-- <h3 class="page-name">NEWS</h3> -->
    <ul class="news-container">
      <article-card v-for='article in this.articles' :article="article"/>
    </ul>
  </div>
</template>

<script>
import store from '../store/store'
import { mapActions } from 'vuex'
import ArticleCard from './Card'

export default {
  store,
  name: 'latest',
  components: {
    ArticleCard
  },
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




// .news-container
//     padding 0 20px

</style>
