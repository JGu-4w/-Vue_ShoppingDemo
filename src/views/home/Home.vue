<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <swiper :banners="banners"></swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Swiper from 'components/common/swiper/Swiper';

import { getHomeMultidata } from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar,
    Swiper,
  },
  created() {
    getHomeMultidata()
      .then(res => {        
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>