<template>
    <li class="news">
    <!-- <div class="news__container" @click="openArticle(article.id)"> -->
      
      <img class="news__img" :src="article.img" alt="news img">
      <router-link :to="{path: '/latest/'+article.id}"><h2 class="news__title">{{ article.title }}</h2></router-link>
      <h2 class="news__excerpt">{{ article.excerpt }}</h2>
      <!-- <h2 class="news__description">{{ article.description }}</h2> -->
    <!-- </div> -->
  </li>
</template>

<script>
export default {
  props: ['article']
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
</style>

