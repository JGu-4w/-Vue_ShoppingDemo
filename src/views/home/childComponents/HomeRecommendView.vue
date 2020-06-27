<template>
  <div id="home-recommend-view">
    <div class="recommend-list" v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: [],
  }
}
</script>

<style>
  #home-recommend-view {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 8px 0 10px;
    border-bottom: 5px solid #f6f6f6;
  }

  .recommend-list {
    flex: 1;
  }

  .recommend-list img {
    width: 70%;
    margin-bottom: 5px;
  }
</style>