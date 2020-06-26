<template>
  <div id="swiper">
    <div class="swiper-content">
      <ul class="swiper-list" :style="setTotalWidth" @transitionend="checkPosition">
        <li class="swiper-item" v-for="(item, index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="indicator">
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'Swiper',
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      itemCount: 0,  // 记录初始banner数
      bannerWidth: 0, // 记录每个banner的宽度
      currentIndex: 0, // 记录当前swiper中的banner序号 
      swiperListStyle: {},
    }
  },
  methods: {
    /**
     * 处理传入的banner数据
     */
    handleBanners: function() {
      // 获取banner总数
      this.itemCount = this.banners.length;

      // 处理传入的banner数据，若banner数大于1，则克隆第一张插入尾部，克隆最后一场插入头部
      if(this.itemCount > 1) {
        this.banners.splice(this.itemCount, 0, this.banners[0]);
        this.banners.splice(0, 0, this.banners[this.itemCount - 1]);
      }
    },

    /**
     * DOM操作以实现轮播图轮播
     */
    handleDom: function() {
      let swiper = document.querySelector(".swiper-content");
      let swiperList = document.querySelector(".swiper-list");
      let swiperItem = document.querySelectorAll(".swiper-item");
      
      // 获取banner宽度和swiperList的style
      this.bannerWidth = swiper.offsetWidth;
      this.swiperListStyle = swiperList.style;

      // 定时轮播，移动位置为当前index * banner宽度
      let timer = setInterval(() => {
        this.currentIndex++;
        this.slideBanner(-this.currentIndex * this.bannerWidth, true);
      }, 3000);
    },

    /**
     * 移动轮播图
     */
    slideBanner: function(translateX, flag) {
      this.setTransition(flag);
      this.swiperListStyle.transform = `translateX(${translateX}px)`;
    },

    /**
     * 检查轮播图是否播放到最后一张图
     */
    checkPosition: function() {
      if(this.currentIndex > this.itemCount - 1) {
        this.currentIndex = 0;
        this.slideBanner(-this.currentIndex * this.bannerWidth, false);
      } else if(this.currentIndex < 0) {
        this.currentIndex = this.itemCount - 1;
        this.slideBanner(-this.currentIndex * this.bannerWidth, false);
      }
    },

    /**
     * flag为true时，开启transition过渡动画，为false时，关闭transition
     */
    setTransition: function(flag) {
      if(flag) {
        this.swiperListStyle.transition = "all .3s";
      } else {
        this.swiperListStyle.transition = "none";
      }
    },

    setTransform: function() {
      setInterval(() => {

      }, 3000);
    }

  },
  computed: {
    /**
     * 计算swiper-list所需总宽度
     */
    setTotalWidth: function() {
      this.handleBanners();
      return {width: (this.itemCount + 2) * 100 + "%"};
    },
    
  },
  mounted: function() {
    setTimeout(() => {
      this.handleDom();
    }, 3000);
  }
  
}
</script>

<style>
  #swiper {
    position: relative;
  }

  .swiper-content {
    position: relative;
    width: 100vw;
    overflow: hidden;
  }

  .swiper-list {
    margin-left: -100%;
  }

  .swiper-item {
    float: left;
  }

  .swiper-item img {
    width: 100vw;
  }


</style>