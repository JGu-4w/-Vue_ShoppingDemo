<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <scroll class="scroll" 
            :prob-type="3" 
            :pull-up-load="true" 
            ref="scroll" 
            @scroll="controlBackTop" 
            @pullingUp="pullingUp">
      <swiper :banners="banners"></swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                  :titles='["流行", "新款", "精选"]'
                  @tabClick="tabClick"></tab-control>
      <product-list :productList="showProducts"></product-list>
    </scroll>
    <back-to-top @click.native="backTop" v-show="isShowBackTop"></back-to-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Swiper from 'components/common/swiper/Swiper';
import Scroll from 'components/common/BScroll/BScroll';

import TabControl from 'components/content/tabControl/TabControl';
import ProductList from 'components/content/products/ProductList';
import BackToTop from 'components/content/backToTop/BackToTop';

import RecommendView from './childComponents/HomeRecommendView';
import FeatureView from './childComponents/FeatureView';

import { getHomeMultidata, getHomeProducts } from 'network/home'

export default {
  name: 'home',
  data() {
    return {
      banners: [],
      recommends: [],
      products: {
        'pop': {page:0, list:[]},
        'new': {page:0, list:[]},
        'sell': {page:0, list:[]},
      },
      currentIndex: 'pop',
      isShowBackTop: false
    }
  },
  components: {
    NavBar,
    Swiper,
    Scroll,
    TabControl,
    ProductList,
    BackToTop,
    RecommendView,
    FeatureView,
  },
  created() {
    setTimeout(() => {
      this.getHomeMultidata();
      this.getHomeProducts('pop');
      this.getHomeProducts('new');
      this.getHomeProducts('sell');
    }, 500)
  },
  methods: {
    // 事件监听相关
    /**
     * 响应tabControl点击事件切换不同商品图
     */
    tabClick(index) {
      switch(index) {
        case 0: 
          this.currentIndex = 'pop';
          break;
        case 1: 
          this.currentIndex = 'new';
          break;
        case 2: 
          this.currentIndex = 'sell';
          break;
      }
    },
    /**
     * 返回至页面顶部
     */
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    /**
     * 判断是否显示回到顶部按钮
     */
    controlBackTop(pos) {
      this.isShowBackTop = (-pos.y) > 1000;
    },
    /**
     * 上拉加载更多
     */
    pullingUp() {
      this.getHomeProducts(this.currentIndex);
      this.$refs.scroll.finishPullUp();
    },
    // 网络请求相关
    /**
     * 获取轮播图和热门推荐数据
     */
    getHomeMultidata() {
      getHomeMultidata()
        .then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch(err => console.log(err));
    },
    /**
     * 获取流行，新款和精选商品的数据
     */
    getHomeProducts(type) {
      const page = this.products[type].page + 1;
      getHomeProducts(type, page).then(res => {
        this.products[type].list.push(...res.data.list);
        this.products[type].page++;
      }).catch(err => console.log(err));
    }
  },
  computed: {
    /**
     * 展示选定的商品
     */
    showProducts() {
      return this.products[this.currentIndex].list;
    }
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
  }

  .home-nav {
    position: sticky;
    top: 0;
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }
</style>