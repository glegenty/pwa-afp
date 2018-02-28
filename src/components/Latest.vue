<template>
  <div class="latest">
    <!-- <h3 class="page-name">NEWS</h3> -->
    <ul class="news-container">
        <article-card v-for='article in this.articles' :article="article"/>
        <!-- <li class="news" v-for='article in this.articles'> -->
          <!-- <div class="news__container" @click="openArticle(article.id)"> -->
            
            <!-- <img class="news__img" :src="article.img" alt="news img">
            <router-link :to="{path: '/latest/'+article.id}"><h2 class="news__title">{{ article.title }}</h2></router-link>
            <h2 class="news__excerpt">{{ article.excerpt }}</h2> -->
            <!-- <h2 class="news__description">{{ article.description }}</h2> -->
          <!-- </div> -->
        <!-- </li> -->
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
  methods: { ...mapActions(['getLatestNews', 'getUnsplashImage']) },
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
      console.log(result)

      for (let i = 0, l = latestArticles.length; i < l; i++) {
        let article = latestArticles[i]
        let description = ''
        for (let j = 0, n = article.news.length; j < n; j++) {
          description += article.news[j]
        }
        article.excerpt = article.news[0]
        article.description = description

        if (article.bagItem) {
          article.img = article.bagItem[0].medias[0].href
        } else {
          article.img = 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Agence_France-Presse_Logo.svg/1200px-Agence_France-Presse_Logo.svg.png'

          // let tags = article.slug.join()
          // article.img = 'https://source.unsplash.com/1600x900/?' + tags
          // this.getUnsplashImage({tags}).then(res => {
          //   article.img = 'https://source.unsplash.com/1600x900/?' + tags
          //   console.log(article.img)
          // })
        }

        article.id = this.articles.length
        this.articles.push(article)
      }
    }).catch(error => console.log(error))
  }
}
</script>

<style lang="stylus">




// .news-container
//     padding 0 20px

</style>
