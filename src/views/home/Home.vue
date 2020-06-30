<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <p>购物街</p>
      </template>
    </nav-bar>
    <tab-control class="tab-control"
            :titles='["流行", "新款", "精选"]'
            @tabClick="tabClick"
            ref="tabControl2"
            v-show="isShowTabControl"></tab-control>
    <scroll class="scroll" 
            :prob-type="3" 
            :pull-up-load="true" 
            ref="scroll" 
            @scroll="controlBackTop"
            @loadMore="loadMore">
      <swiper :banners="banners" @swiperImgLoaded="swiperImgLoaded"></swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control"
                  :titles='["流行", "新款", "精选"]'
                  @tabClick="tabClick"
                  ref="tabControl1"></tab-control>
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

import { getHomeMultidata, getHomeProducts } from 'network/home';
import { debounce } from 'common/utils';

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShowTabControl: false,
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
    this.getHomeMultidata();
    this.getHomeProducts('pop');
    this.getHomeProducts('new');
    this.getHomeProducts('sell');
  },
  mounted() {
    // 监听item中的图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on('itemLoaded', () => {
      refresh();
    })
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
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
      this.isShowTabControl = (-pos.y) > this.tabOffsetTop;
    },
    /**
     * 上拉加载更多
     */
    loadMore() {
      this.getHomeProducts(this.currentIndex);
      setTimeout(() => {
        this.$refs.scroll.finishPullUp();
      }, 600);
    },
    /**
     * 获取tabControl的offsetTop
     */
    swiperImgLoaded() {
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop;      
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
    background-color: var(--color-tint);
    color: #fff;
    /* 使用系统原生滚动时，让导航栏不跟随页面滚动 */
    /* position: sticky;
    top: 0; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>