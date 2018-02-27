<template>
  <div class="latest">
    <h1>Latest News</h1>
    <ul class="news-container">
        <li class="news" v-for='article in this.news'>
          <img class="news__img" :src="article.img" alt="news img">
          <h2 class="news__title">{{ article.title }}</h2>
          <h2 class="news__excerpt">{{ article.excerpt }}</h2>
          <h2 class="news__description">{{ article.description }}</h2>
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
  methods: { ...mapActions(['getLatestNews', 'getUnsplashImage']) },
  data () {
    return {
      news: {}
    }
  },
  mounted () {
    this.getLatestNews().then(result => {
      console.log(result)

      this.news = result.body.response.docs
      console.log(this.news)

      for (let i = 0, l = this.news.length; i < l; i++) {
        let article = this.news[i]
        let description = ''
        for (let j = 0, n = article.news.length; j < n; j++) {
          description += article.news[j]
          // console.log(article.news[j])
        }
        article.excerpt = article.news[0]
        article.description = description
        let tags = article.slug.join()
        if (article.bagItem) {
          article.img = article.bagItem[0].medias[0].href
        } else {
          console.log(tags)
          article.img = 'https://source.unsplash.com/1600x900/?' + tags

          // this.getUnsplashImage({tags}).then(res => {
          //   article.img = 'https://source.unsplash.com/1600x900/?' + tags
          //   console.log(article.img)
          // })
        }
      }
    })
  }
}
</script>

<style>
.news {
  text-align: left;
}

.news__title {
  font-size: 16px;
}

.news__excerpt {
  font-size: 10px;
}

.news__description {
  font-size: 6px;
}
.news__img {
  width: 100%;
}

</style>
