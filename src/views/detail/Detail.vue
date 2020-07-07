<template>
  <div id="detail">
    <detail-nav-bar @navClick="jumpTo" ref="detailnavbar"></detail-nav-bar>
    <scroll class="content" 
            :probe-type="3" 
            ref="scroll" 
            @scroll="controlScroll">
      <div>
        <detail-swiper :banners="topImages" class="detail-swiper"></detail-swiper>
        <detail-basic-info :product="product"></detail-basic-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-desc :detail="detail" @imgLoaded="imgLoaded"></detail-desc>
        <detail-product-params :params="params" ref="params"></detail-product-params>
        <detail-comment-info :comments="comments" ref="comments"></detail-comment-info>
        <recommend :productList="recommends" ref="recommends"></recommend>
      </div>
    </scroll>
    <detail-add-cart ref="addcart" :cartProductInfo="cartProduct" :productTitle="product.title"></detail-add-cart>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-to-top v-show="showBackTop" @click.native="backToTop"></back-to-top>
  </div>
</template>

<script>
import DetailSwiper from 'components/common/swiper/DetailSwiper';
import Scroll from 'components/common/BScroll/BScroll';
import Recommend from 'components/content/products/ProductList';
import BackToTop from 'components/content/backToTop/BackToTop';

import DetailNavBar from './childComponents/DetailNavBar';
import DetailBasicInfo from './childComponents/DetailBasicInfo';
import DetailShopInfo from './childComponents/DetailShopInfo';
import DetailDesc from './childComponents/DetailDesc';
import DetailProductParams from './childComponents/DetailProductParams';
import DetailCommentInfo from './childComponents/DetailCommentInfo';
import DetailBottomBar from './childComponents/DetailBottomBar';
import DetailAddCart from './childComponents/DetailAddCart';

import { getProductDetail, 
         getRecommend,
         ProductInfo, 
         ShopInfo, 
         DetailInfo, 
         ProductParams, 
         CommentInfo,
         CartProductInfo } from 'network/detail';

import { debounce } from 'common/utils'

export default {
  name: 'Detail',
  components: {
    DetailSwiper,
    Scroll,
    Recommend,
    BackToTop,
    DetailNavBar,
    DetailBasicInfo,
    DetailShopInfo,
    DetailDesc,
    DetailProductParams,
    DetailCommentInfo,
    DetailBottomBar,
    DetailAddCart,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      product: {},
      shop: {},
      detail: {},
      params: {},
      comments: {},
      recommends: [],
      showBackTop: false,
      positions: [],  // 记录详情页面顶部导航栏四个选项的纵坐标
      cartProduct: {}
    }
  },
  created() {
    // 获取product对应的iid
    this.iid = this.$route.params.iid;
    // 网络请求product的detail
    getProductDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 获取顶部轮播图片
      this.topImages = data.itemInfo.topImages;
      // 获取商品基本信息
      this.product = new ProductInfo(data.itemInfo, data.columns, data.shopInfo.services);
      // 获取店铺详情
      this.shop = new ShopInfo(data.shopInfo);
      // 获取商品详情
      this.detail = new DetailInfo(data.detailInfo);
      // 获取商品参数
      this.params = new ProductParams(data.itemParams.info, data.itemParams.rule);
      // 获取评论
      this.comments = new CommentInfo(data.rate);
      // 获取添加购物车页面商品详情
      this.cartProduct = new CartProductInfo(data.skuInfo, data.shopInfo);
    })
    // 网络请求获取recommend的数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    })
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.myRefresh, 200);
    this.$bus.$on('detailItemLoaded', () => {
      refresh();
    })
  },
  methods: {
    imgLoaded() {
      this.$refs.scroll.myRefresh();
      this.recordPosition();
    },
    controlScroll(pos) {
      this.showBackTop = (-pos.y) > 1000;

      for(let i = 0; i < this.positions.length - 1; i++) {
        if((-pos.y) >= this.positions[i] && (-pos.y) < this.positions[i + 1]) {
          this.$refs.detailnavbar.currentIndex = i;
        }
      }
    },
    backToTop() {
      this.$refs.scroll.myScrollTo(0, 0);
    },
    /**
     * 记录顶部导航栏四个选项的纵向坐标
     */
    recordPosition() {
      const params = this.$refs.params.$el.offsetTop - 44;
      const comments = this.$refs.comments.$el.offsetTop - 44;
      const recommends = this.$refs.recommends.$el.offsetTop - 44;
      this.positions = [0, params, comments, recommends, Number.MAX_VALUE];
    },
    /**
     * 跳至点击顶部导航的选项
     */
    jumpTo(index) {
      this.$refs.scroll.myScrollTo(0, -this.positions[index]);
    },
    /**
     * 当添加购物车按钮被点击，弹出添加购物车的页面
     */
    addToCart() {
      this.$refs.addcart.showAddCart = true;
    }
  }
}
</script>

<style>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>